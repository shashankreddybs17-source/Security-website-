import { writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { build } from 'vite';

await build({
  plugins: [
    {
      name: 'local-bundle-report',
      writeBundle(_options, bundle) {
        const chunks = Object.values(bundle)
          .filter((item) => item.type === 'chunk')
          .map((chunk) => ({
            file: chunk.fileName,
            entry: chunk.isEntry,
            bytes: Buffer.byteLength(chunk.code),
            gzipBytes: gzipSync(chunk.code).length,
            imports: chunk.imports,
            dynamicImports: chunk.dynamicImports,
            modules: Object.entries(chunk.modules)
              .map(([id, module]) => ({
                id: id
                  .replaceAll('\\', '/')
                  .split(process.cwd().replaceAll('\\', '/') + '/')
                  .pop(),
                renderedBytes: module.renderedLength,
              }))
              .sort((a, b) => b.renderedBytes - a.renderedBytes),
          }))
          .sort((a, b) => b.bytes - a.bytes);
        writeFileSync('BUNDLE-ANALYSIS.json', JSON.stringify(chunks, null, 2) + '\n');
      },
    },
  ],
});
