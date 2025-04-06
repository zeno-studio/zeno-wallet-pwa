import { encodeQR } from 'qr';

interface QrOptions {
  errorCorrection?: 'high' | 'low' | 'medium' | 'quartile';
  version?: number;
  size?: number;
  color?: string;
  radius?: number;
  border?: number;
}

interface ArenaOptions {
  image?: string;
  content?: string;
}

export function generateQRCodeSvg(
  value: string,
  options: QrOptions = {},
  arena?: ArenaOptions
): string {
  const {
    errorCorrection = 'medium',
    version,
    size = 300,
    color = '#000000',
    radius = 0.25,
    border = 3
  } = options;


  const grid = encodeQR(value, 'raw', {
    border: border,
    ecc: errorCorrection,
    scale: 1,
    version: version,
  });

  const finderLength = 7;
  const edgeLength = grid.length;
  const cellSize = size / edgeLength;
  const finderSize = finderLength * cellSize;

  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="white" />`;
  for (let y = 0; y < edgeLength; y++) {
    for (let x = 0; x < edgeLength; x++) {
      if (grid[y][x]) {
        const isFinderArea =
          (x < finderLength + border && y < finderLength + border) ||
          (x >= edgeLength - finderLength - border && y < finderLength + border) ||
          (x < finderLength + border && y >= edgeLength - finderLength - border);

        if (isFinderArea) {
          continue;
        }

        if (arena &&
          x >= (edgeLength - 1) / 2 - 3 &&
          x <= (edgeLength - 1) / 2 + 3 &&
          y >= (edgeLength - 1) / 2 - 3 &&
          y <= (edgeLength - 1) / 2 + 3) {
          continue;
        }


        svg += `<circle cx="${(x + 0.5) * cellSize}" cy="${(y + 0.5) * cellSize}" r="${cellSize / 2}" fill="${color}" />`;
      }
    }
  }


  const drawFinder = (x: number, y: number, position: string) => {
    const finderX = x * cellSize;
    const finderY = y * cellSize;

    svg += `<rect x="${finderX}" y="${finderY}" width="${finderSize}" height="${finderSize}" fill="${color}" rx="${finderSize * radius}" />`;

    svg += `<rect x="${finderX + cellSize}" y="${finderY + cellSize}" width="${finderSize - 2 * cellSize}" height="${finderSize - 2 * cellSize}" fill="white" rx="${(finderSize - 2 * cellSize) * radius}" />`;

    svg += `<rect x="${finderX + 2 * cellSize}" y="${finderY + 2 * cellSize}" width="${finderSize - 4 * cellSize}" height="${finderSize - 4 * cellSize}" fill="${color}" rx="${(finderSize - 4 * cellSize) * radius}" />`;
  };


  const finderOffset = border; 
  drawFinder(finderOffset, finderOffset, 'top-left');
  drawFinder(edgeLength - finderLength - finderOffset, finderOffset, 'top-right'); // 右上角
  drawFinder(finderOffset, edgeLength - finderLength - finderOffset, 'bottom-left'); // 左下角


  if (arena) {
    const arenaSize = size * 0.2; 
    const arenaX = (size - arenaSize) / 2;
    const arenaY = (size - arenaSize) / 2;

    if (arena.image) {
      svg += `<image href="${arena.image}" x="${arenaX}" y="${arenaY}" width="${arenaSize}" height="${arenaSize}" preserveAspectRatio="xMidYMid slice" />`;
    } else if (arena.content) {
      svg += `<text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="middle" font-size="${arenaSize / 8}" fill="${color}">${arena.content}</text>`;
    }
  }

  svg += '</svg>';
  return svg;
}