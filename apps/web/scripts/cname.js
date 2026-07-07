// scripts/cname.js
// This script conditionally creates a CNAME file in the out directory for custom domain deployment.

const { writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const outDir = join(__dirname, '..', 'out');

async function main() {
  const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
  if (isCustomDomain) {
    await writeFile(join(outDir, 'CNAME'), 'mcpkit.js.org');
    console.log('✅ CNAME file created for mcpkit.js.org');
  } else {
    console.log('ℹ️  Skipping CNAME file creation (not building for custom domain)');
  }
}

main().catch(console.error);