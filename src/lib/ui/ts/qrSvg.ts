import { encodeQR } from 'qr';
import decodeQR from 'qr/decode.js';

interface QrOptions {
	errorCorrection?: 'high' | 'low' | 'medium' | 'quartile';
	version?: number;
	size?: number;
	color?: string;
	radius?: number;
	border?: number;
}

interface ArenaOptions {
	image?: string; // 图片 URL
	content?: string; // 文字内容
}

// 辅助函数：将图片 URL 转为 Base64
async function imageToBase64(url: string): Promise<string> {
	try {
		const response = await fetch(url);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (error) {
		console.error('Failed to convert image to Base64:', error);
		return '';
	}
}

// 修改后的 generateQRCodeSvg 函数，支持异步操作以嵌入 Base64 图片
export async function generateQRCodeSvg(
	value: string,
	options: QrOptions = {},
	arena?: ArenaOptions
): Promise<string> {
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
		version: version
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

				// 6x6 区域（4x4 徽标 + 1 点位间隔）
				if (
					arena &&
					x >= (edgeLength - 1) / 2 - 3 &&
					x <= (edgeLength - 1) / 2 + 3 &&
					y >= (edgeLength - 1) / 2 - 3 &&
					y <= (edgeLength - 1) / 2 + 3
				) {
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
	drawFinder(edgeLength - finderLength - finderOffset, finderOffset, 'top-right');
	drawFinder(finderOffset, edgeLength - finderLength - finderOffset, 'bottom-left');

	if (arena) {
		const arenaSize = 5 * cellSize; // 4x4 点位
		const arenaX = (size - arenaSize) / 2;
		const arenaY = (size - arenaSize) / 2;

		if (arena.image) {
			// 将图片转为 Base64 嵌入
			const base64Image = await imageToBase64(arena.image);
			if (base64Image) {
				svg += `<image href="${base64Image}" x="${arenaX}" y="${arenaY}" width="${arenaSize}" height="${arenaSize}" preserveAspectRatio="xMidYMid slice" />`;
			} else {
				console.warn('Failed to embed image, skipping arena.image');
			}
		} else if (arena.content) {
			// 使用标准字体（如 sans-serif）以确保兼容性
			svg += `<text x="${size / 2}" y="${size / 2}" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="${arenaSize / 4}" fill="${color}">${arena.content}</text>`;
		}
	}

	svg += '</svg>';
	return svg;
}

export async function downloadQRCodeAsPNG(svgString: string, options: QrOptions = {}) {
	// 将 SVG 字符串转为 Base64 数据 URL，移除 unescape
	const svgBase64 = `data:image/svg+xml;base64,${btoa(encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))))}`;

	// 创建 Canvas
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = options.size || 300;
	canvas.height = options.size || 300;

	// 加载 SVG 到 Image
	const img = new Image();
	img.src = svgBase64;

	// 等待图片加载完成
	await new Promise((resolve, reject) => {
		img.onload = resolve;
		img.onerror = () => reject(new Error('Failed to load SVG image'));
	});

	// 绘制到 Canvas
	ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

	// 转换为 PNG 并下载
	const pngUrl = canvas.toDataURL('image/png');
	const a = document.createElement('a');
	a.href = pngUrl;
	a.download = 'qrcode.png';
	a.click();
}

export async function shareQRCodeAsPNG(svgString: string, options: QrOptions = {}) {
    // 将 SVG 字符串转为 Base64 数据 URL
    const svgBase64 = `data:image/svg+xml;base64,${btoa(encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))) )}`;

    // 创建 Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = options.size || 300;
    canvas.height = options.size || 300;

    // 加载 SVG 到 Image
    const img = new Image();
    img.src = svgBase64;

    // 等待图片加载完成
    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load SVG image'));
    });

    // 绘制到 Canvas
    ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 转换为 PNG Blob
    return new Promise<void>((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                reject(new Error('Failed to convert canvas to PNG blob'));
                return;
            }
            const file = new File([blob], 'qrcode.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'QR Code',
                        text: 'Here is your QR code'
                    });
                    resolve();
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(new Error('Sharing not supported on this device'));
            }
        }, 'image/png');
    });
}

export async function decodeQRimg(file: File): Promise<string> {
	if (!['image/png', 'image/jpeg'].includes(file.type)) {
		throw new Error('Only PNG and JPEG images are supported for QR code decoding');
	}

	// 将 File 转为 Base64
	const base64 = await new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = () => reject(new Error('failed to read file'));
		reader.readAsDataURL(file);
	});

	// 创建 Image 元素加载 Base64 图像
	const img = new Image();
	img.src = base64;

	await new Promise((resolve, reject) => {
		img.onload = resolve;
		img.onerror = () => reject(new Error('failed to load image'));
	});

	// 创建 Canvas 绘制图像
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('failed to get canvas context');
	}
	ctx.drawImage(img, 0, 0);

	// 获取 ImageData
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	// 构造 paulmillr/qr 所需的 Image 对象
	const qrImage = {
		width: canvas.width,
		height: canvas.height,
		data: imageData.data // Uint8ClampedArray
	};

	try {
		// 使用 paulmillr/qr 的 decode 方法
		const decoded = decodeQR(qrImage);
		return decoded;
	} catch (error) {
		throw new Error(
			'failed to decode QR code: ' + (error instanceof Error ? error.message : 'Unknown error')
		);
	}
}
