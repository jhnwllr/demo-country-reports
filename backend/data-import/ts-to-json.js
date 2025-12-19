import fs from 'fs';
import vm from 'vm';
import path from 'path';

function usage() {
  console.error('Usage: node ts-to-json.js <path-to-ts-file>');
  process.exit(2);
}

const filePath = process.argv[2];
if (!filePath) usage();

let code;
try {
  code = fs.readFileSync(filePath, 'utf8');
} catch (e) {
  console.error('Failed to read file:', e.message);
  process.exit(3);
}

// Remove import lines (TypeScript types) and export type annotations
code = code.replace(/^import.*$/mg, '');

// Replace "export const name: Type =" with "const name ="
code = code.replace(/export\s+const\s+([A-Za-z0-9_]+)\s*:[^=]*=\s*/m, 'const $1 = ');

// Also handle "export const name =" (no type)
code = code.replace(/export\s+const\s+([A-Za-z0-9_]+)\s*=\s*/m, 'const $1 = ');

// Find the exported variable name (first const)
const m = code.match(/const\s+([A-Za-z0-9_]+)\s*=/);
const varName = m ? m[1] : null;
if (!varName) {
  console.error('Could not detect exported const name in', filePath);
  process.exit(4);
}

// Wrap code in a VM and print the variable as JSON
const script = `${code}\nconsole.log(JSON.stringify(${varName}));`;

try {
  // Create small shims for CommonJS names to avoid ReferenceError inside VM
  const requireShim = () => { throw new Error('require is not available in this sandboxed evaluation'); };
  vm.runInNewContext(script, {
    console,
    require: requireShim,
    module: {},
    exports: {},
    process,
    Buffer,
  }, { filename: path.basename(filePath) });
} catch (e) {
  console.error('Failed to evaluate TS file:', e && e.stack ? e.stack : e);
  process.exit(5);
}
