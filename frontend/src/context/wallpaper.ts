import type { CSSProperties } from "react";
import { createContext, useContext } from "react";
import type { getWallpaperById } from "@/lib/utils";
import type { WallpaperId } from "../data/wallpapers";

type Wallpaper = ReturnType<typeof getWallpaperById>;

export interface WallpaperContextValue {
	wallpaperId: WallpaperId;
	setWallpaperId: (id: WallpaperId) => void;
	wallpaper: Wallpaper;
	frameStyle: CSSProperties;
}

export const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export function useWallpaper(): WallpaperContextValue {
	const ctx = useContext(WallpaperContext);

	if (!ctx) {
		throw new Error("useWallpaper must be used within WallpaperProvider");
	}

	return ctx;
}
