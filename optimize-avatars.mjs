import sharp from 'sharp';
import { readdir, unlink, rename } from 'fs/promises';
import { join } from 'path';

const inputDir = 'public/assets/account/dashboard-assets';
const TARGET_SIZE = 80; // 80x80px como dice el README

async function optimizeAvatars() {
  try {
    const files = await readdir(inputDir);
    const webpFiles = files.filter(f => f.endsWith('.webp') && f.startsWith('avatar-level-'));

    console.log(`🔍 Found ${webpFiles.length} avatar files to optimize...`);

    for (const file of webpFiles) {
      const inputPath = join(inputDir, file);
      const tempPath = join(inputDir, file + '.tmp');

      // Get original size
      const metadata = await sharp(inputPath).metadata();
      const originalSize = (await sharp(inputPath).toBuffer()).length;

      // Resize and optimize to temp file
      await sharp(inputPath)
        .resize(TARGET_SIZE, TARGET_SIZE, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 80, effort: 6 })
        .toFile(tempPath);

      // Get new size
      const newSize = (await sharp(tempPath).toBuffer()).length;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      // Replace original with optimized version
      await unlink(inputPath);
      await rename(tempPath, inputPath);

      console.log(`✅ ${file}: ${metadata.width}x${metadata.height} (${(originalSize/1024).toFixed(1)}KB) → ${TARGET_SIZE}x${TARGET_SIZE} (${(newSize/1024).toFixed(1)}KB) [-${savings}%]`);
    }

    console.log(`\n🎉 Optimized ${webpFiles.length} avatars to ${TARGET_SIZE}x${TARGET_SIZE}px`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

optimizeAvatars();
