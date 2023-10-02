const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// 이미지 생성 및 저장할 폴더 경로
const outputDir = path.join(__dirname, 'random_images');
fs.mkdirSync(outputDir, { recursive: true });

// 이미지 생성 함수
async function generateRandomImage(index) {
  const width = 200; // 이미지 너비
  const height = 200; // 이미지 높이
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 배경색 설정 (랜덤한 RGB 색상)
  ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
  ctx.fillRect(0, 0, width, height);

  // 이미지에 랜덤한 텍스트 그리기
  ctx.fillStyle = 'white';
  ctx.font = '20px sans-serif';
  ctx.fillText(`Random Image ${index}`, 20, 50);

  // 이미지 저장
  const outputFilePath = path.join(outputDir, `random_image_${index}.png`);
  const stream = fs.createWriteStream(outputFilePath);
  const pngStream = canvas.createPNGStream();
  pngStream.pipe(stream);
  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  console.log(`Generated: ${outputFilePath}`);
}

// 1000개의 랜덤 이미지 생성
async function generateRandomImages() {
  const numImages = 1000;
  for (let i = 0; i < numImages; i++) {
    await generateRandomImage(i);
  }
}

generateRandomImages().then(() => {
  console.log('All images generated.');
});