const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function generatePngBuffer(width, height, isMaskable = false) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // deflate compression
  ihdrData.writeUInt8(0, 11); // standard filter
  ihdrData.writeUInt8(0, 12); // non-interlaced

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.concat([typeBuf, data]);
    const crc = zlib.crc32(crcBuf);
    const crcOut = Buffer.alloc(4);
    crcOut.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([len, typeBuf, data, crcOut]);
  }

  // Draw pixel data with raw scanlines (filter byte 0 = None)
  const rawBytes = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = isMaskable ? width * 0.38 : width * 0.44;

  for (let y = 0; y < height; y++) {
    rawBytes[offset++] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background gradient: iOS System Blue (#007AFF -> #0045A5)
      const gradRatio = y / height;
      let r = Math.round(0 * (1 - gradRatio) + 0 * gradRatio);
      let g = Math.round(122 * (1 - gradRatio) + 69 * gradRatio);
      let b = Math.round(255 * (1 - gradRatio) + 165 * gradRatio);
      let a = 255;

      // Center decorative badge / Spanish flag accents
      if (dist < radius) {
        // Center badge inside circle
        if (Math.abs(dy) < radius * 0.55 && Math.abs(dx) < radius * 0.7) {
          // Spanish flag stripe bands
          if (dy >= -radius * 0.45 && dy <= -radius * 0.25) {
            // Red band
            r = 238; g = 38; b = 38;
          } else if (dy > -radius * 0.25 && dy < radius * 0.05) {
            // Gold band
            r = 255; g = 196; b = 0;
          } else if (dy >= radius * 0.05 && dy <= radius * 0.25) {
            // Red band
            r = 238; g = 38; b = 38;
          } else {
            // White card
            r = 255; g = 255; b = 255;
          }
        }
      }

      rawBytes[offset++] = r;
      rawBytes[offset++] = g;
      rawBytes[offset++] = b;
      rawBytes[offset++] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawBytes);
  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. apple-touch-icon.png (180x180)
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePngBuffer(180, 180, false));
console.log('Generated apple-touch-icon.png (180x180)');

// 2. pwa-192x192.png
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePngBuffer(192, 192, false));
console.log('Generated pwa-192x192.png (192x192)');

// 3. pwa-512x512.png
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePngBuffer(512, 512, false));
console.log('Generated pwa-512x512.png (512x512)');

// 4. pwa-maskable-512x512.png
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePngBuffer(512, 512, true));
console.log('Generated pwa-maskable-512x512.png (512x512 maskable)');

// 5. favicon.ico (fallback 32x32 PNG structure works for modern browsers)
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePngBuffer(32, 32, false));
console.log('Generated favicon.ico (32x32)');
