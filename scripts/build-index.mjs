/**
 * build-index.mjs
 * Runs Pagefind indexing via the Node.js API instead of the CLI binary.
 *
 * Behaviour:
 *  - CI (process.env.CI is set): failure is fatal → exits 1 so the pipeline
 *    never ships a build without a search index.
 *  - Local dev: falls back gracefully with a warning so `npm run build` still
 *    succeeds when the MSVC runtime is missing on Windows.
 *    Fix: install https://aka.ms/vs/17/release/vc_redist.x64.exe
 */
import { createIndex } from 'pagefind';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = resolve(__dirname, '..', 'dist');
const isCI = Boolean(process.env.CI);

console.log('[pagefind] Building search index for:', distPath);

let index;
try {
  const result = await createIndex({});
  if (result.errors?.length) throw new Error(result.errors.join(', '));
  index = result.index;
} catch (err) {
  const isBinaryError =
    err.code === 'EFTYPE' ||
    (err.message && (err.message.includes('spawn') || err.message.includes('not a valid application')));

  if (isBinaryError) {
    if (isCI) {
      console.error('[pagefind] ✖ Native binary unavailable in CI — cannot build search index.');
      console.error('[pagefind]   Ensure the build runner uses a Linux/macOS environment.');
      process.exit(1);
    }
    console.warn('[pagefind] ⚠️  Native binary unavailable on this platform (Windows/MSVC issue).');
    console.warn('[pagefind]    Fix: https://aka.ms/vs/17/release/vc_redist.x64.exe');
    console.warn('[pagefind]    Search indexing will run automatically in CI (Linux).');
    console.warn('[pagefind]    Build completed without search index.');
    process.exit(0);
  }

  console.error('[pagefind] Error creating index:', err.message);
  process.exit(1);
}

try {
  const { page_count, errors: dirErrors } = await index.addDirectory({ path: distPath });
  if (dirErrors?.length) throw new Error(dirErrors.join(', '));
  console.log(`[pagefind] Indexed ${page_count} pages.`);

  const { outputPath, errors: writeErrors } = await index.writeFiles({
    outputPath: resolve(distPath, 'pagefind'),
  });
  if (writeErrors?.length) throw new Error(writeErrors.join(', '));
  console.log('[pagefind] ✓ Search index written to:', outputPath);
} catch (err) {
  console.error('[pagefind] Indexing failed:', err.message);
  process.exit(1);
}
