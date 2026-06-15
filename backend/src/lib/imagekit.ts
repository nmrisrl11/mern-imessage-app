import ImageKit, { toFile } from "@imagekit/nodejs";

function getImageKit(): ImageKit {
	const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

	if (!privateKey) {
		throw new Error("No ImageKit Private Key found from .env file.");
	}

	return new ImageKit({ privateKey });
}

function hasImageKitConfig(): boolean {
	return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}

//! originalName = "My Photo (1).png"
//! Result: "chat-1749300000000-My_Photo__1_.png"
//! This helper makes a safe, unique filename for uploaded files.
function createFileName(originalName: string = "upload"): string {
	const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
	return `chat-${Date.now()}-${safeName}`;
}

/**
 * Upload image or video to ImageKit
 * @see https://imagekit.io/docs/api-reference/upload-file/upload-file
 */
async function uploadChatMedia(file: Express.Multer.File): Promise<string | undefined> {
	const imageKit = getImageKit();
	const fileName = createFileName(file.originalname);

	const result = await imageKit.files.upload({
		file: await toFile(file.buffer, fileName, { type: file.mimetype }),
		fileName,
		folder: "/chat",
	});

	return result.url;
}

export { hasImageKitConfig, uploadChatMedia };
