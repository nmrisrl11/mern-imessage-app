import type { ImgHTMLAttributes } from "react";
import { APP_DATA } from "@/data/app-data";
import { cn } from "@/lib/utils";

export interface AppLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> {
	size?: number;
	alt?: string;
}

export function AppLogo({ className = "", size = 32, alt = APP_DATA.name, ...rest }: AppLogoProps) {
	return (
		<img
			src="/logo.png"
			alt={alt}
			width={size}
			height={size}
			className={cn("shrink-0 object-contain select-none", className)}
			draggable={false}
			{...rest}
		/>
	);
}
