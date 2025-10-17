import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const files = [
  'public/assets/achievements/read/1.png',
  'public/assets/achievements/read/5.png',
  'public/assets/achievements/read/25.png',
  'public/assets/achievements/read/50.png',
  'public/assets/achievements/read/100.png',
  'public/assets/achievements/read/200.png',
  'public/assets/achievements/fav/1.png',
  'public/assets/achievements/fav/5.png',
  'public/assets/achievements/fav/10.png',
  'public/assets/achievements/fav/25.png',
  'public/assets/achievements/fav/50.png',
];

files.forEach(file => {
  const webpFile = file.replace('.png', '.webp');
  try {
    execSync(`node -e "
      import('https://esm.sh/imagemagick-wasm@0.0.5').then(({ Image }) => {
        const fs = require('fs');
        const data = fs.readFileSync('${file}');
        const img = new Image(data);
        const webp = img.toWebP(75);
        fs.writeFileSync('${webpFile}', webp);
      });
    "`);
    console.log(\`✓ Convertido: \${file} → \${webpFile}\`);
  } catch (e) {
    console.log(\`Intentando alternativa para \${file}...\`);
  }
});
