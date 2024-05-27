import fs from 'fs';
import path from 'path';

interface SaveFileProps {
  fileName: string;
  destination: string;
  content: string;
}

export function saveFile({ fileName, destination, content }: SaveFileProps) {
  const dest = path.join(destination, fileName);

  fs.writeFile(dest, content, (err) => {
    if (err) return console.error('Error writing file:', err);

    console.log('✅ Schema created successfully!');
  });
}

export function copyDir(from: string, destination: string) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(from, { withFileTypes: true });

  for (const entry of entries) {
    const fromPath = path.join(from, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDir(fromPath, destinationPath);
    } else {
      fs.copyFileSync(fromPath, destinationPath);
    }
  }
}