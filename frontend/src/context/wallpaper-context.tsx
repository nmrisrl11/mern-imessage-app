import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { frameStyleFromUrl, getWallpaperById, WALLPAPERS, type WallpaperId } from "../data/wallpapers";

import { WallpaperContext } from "./wallpaper";

const STORAGE_KEY = "chat-wallpaper-id";

function isWallpaperId(value: string): value is WallpaperId {
	return WALLPAPERS.some((w) => w.id === value);
}

function readStoredWallpaperId(): WallpaperId {
	const wallpaperId = localStorage.getItem(STORAGE_KEY);

	if (wallpaperId && isWallpaperId(wallpaperId)) {
		return wallpaperId;
	}

	return "sonoma-horizon";
}

interface WallpaperProviderProps {
	children: ReactNode;
}

export function WallpaperProvider({ children }: WallpaperProviderProps) {
	const [wallpaperId, setWallpaperIdState] = useState<WallpaperId>(readStoredWallpaperId);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, wallpaperId);
	}, [wallpaperId]);

	const wallpaper = getWallpaperById(wallpaperId);

	const setWallpaperId = (id: WallpaperId) => {
		setWallpaperIdState(id);
	};

	const frameStyle = frameStyleFromUrl(wallpaper.url);

	return (
		<WallpaperContext.Provider
			value={{
				wallpaperId,
				setWallpaperId,
				wallpaper,
				frameStyle,
			}}
		>
			{children}
		</WallpaperContext.Provider>
	);
}
