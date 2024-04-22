import * as fs from 'fs';
import * as process from 'process';

interface AnyObject {
  [key: string]: any;
}

function deleteProperty(obj: AnyObject, path: string): void {
  const parts = path.split('.');
  const last = parts.pop();
  if (!last) throw new Error("Invalid path");
  const lastObj = parts.reduce((o, k) => (o[k] = o[k] || {}), obj);
  delete lastObj[last];
}

// Custom function to serialize object including functions
const serialize = (obj: any, depth = 0): string => {
  const indent = '    '; // 4 spaces for indentation
  let entries = Object.entries(obj).map(([key, value]) => {
    const prefix = `\n${indent.repeat(depth + 1)}`;
    if (typeof value === 'string' || typeof value === 'number') {
      return `${prefix}${JSON.stringify(key)}: ${JSON.stringify(value)}`;
    } else if (typeof value === 'function') {
      const functionBody = value.toString().replace(/\n/g, `\n${indent.repeat(depth + 2)}`);
      return `${prefix}${JSON.stringify(key)}: ${functionBody}`;
    } else {
      return `${prefix}${JSON.stringify(key)}: ${serialize(value, depth + 1)}`;
    }
  });
  return `{${entries.join(',')}\n${indent.repeat(depth)}}`;
};

function main(): void {
  const filePath = process.argv[2];
  const propertyPath = process.argv[3];

  if (!filePath || !propertyPath) {
    console.error("Usage: ts-node deleteProperty.ts <file path> <property path>");
    process.exit(1);
  }

  // Read the file
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export default (\{[\s\S]*\});/);
  if (!match || !match[1]) {
    console.error("Could not find an object to modify.");
    process.exit(1);
  }

  // Attempt to safely parse the object
  let obj: AnyObject;
  try {
    eval(`obj = ${match[1]}`);
  } catch (error) {
    console.error("Failed to parse the object:", error);
    process.exit(1);
  }

  // Delete the property
  deleteProperty(obj, propertyPath);

  // Rebuild the file content
  const newContent = `export default ${serialize(obj)};`;

  // Write back to the file
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Property '${propertyPath}' has been deleted from ${filePath}`);
}

main();
