import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WALLPAPERS, type WallpaperId } from "@/data/wallpapers";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function frameStyleFromUrl(url: string): React.CSSProperties {
	return {
		backgroundImage: `url("${url}")`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
}

export function getWallpaperById(id: WallpaperId): (typeof WALLPAPERS)[number] {
	return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
}

export function formatMessageTime(date: string | number | Date): string {
	const d = date instanceof Date ? date : new Date(date);

	if (Number.isNaN(d.getTime())) {
		throw new Error("Invalid date provided to formatMessageTime");
	}

	return d.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
	});
}
