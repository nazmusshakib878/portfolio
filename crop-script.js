const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImages() {
  const uploadedDir = 'C:/Users/Shakib/.gemini/antigravity-ide/brain/0a319fc5-68b6-4378-ba3e-557ebeb80160/.user_uploaded';
  const outDir = path.resolve('public/projects/resumate-ai');

  const images = [
    { src: 'media_1788121219330.png', dest: '01-multimodal-ingestion.webp' },
    { src: 'media_1788121219157.png', dest: '02-conversational-editing.webp' },
    { src: 'media_1788121219220.png', dest: '03-ats-optimization.webp' },
    { src: 'media_1788121219047.png', dest: '04-one-page-fit-export.webp' },
  ];

  for (const img of images) {
    const srcPath = path.join(uploadedDir, img.src);
    const destPath = path.join(outDir, img.dest);
    
    const metadata = await sharp(srcPath).metadata();
    
    // Top 8.2%, Bottom 4.8%
    const topCrop = Math.round(metadata.height * 0.082);
    const bottomCrop = Math.round(metadata.height * 0.048);
    const extractHeight = metadata.height - topCrop - bottomCrop;
    
    await sharp(srcPath)
      .extract({ left: 0, top: topCrop, width: metadata.width, height: extractHeight })
      .webp({ quality: 90 })
      .toFile(destPath);
      
    console.log(`Processed ${img.dest}`);
  }
}

processImages().catch(console.error);
