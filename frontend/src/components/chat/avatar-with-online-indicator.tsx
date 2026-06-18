import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface AvatarWithOnlineIndicatorProps {
	isOnline: boolean;
	children: ReactNode;
	dotClassName?: string;
}

/**
 * Wraps an Avatar with a bottom-right presence dot (online / offline).
 */

export function AvatarWithOnlineIndicator({ isOnline, children, dotClassName = "" }: AvatarWithOnlineIndicatorProps) {
	const { t: Translate } = useTranslation("translation", {
		keyPrefix: "Text",
	});

	return (
		<div className="relative inline-flex shrink-0">
			{children}
			<span
				className={cn(
					"pointer-events-none absolute bottom-0 right-0 z-10 size-2.75 rounded-full border-[2.5px] border-white shadow-sm dark:border-zinc-950",
					dotClassName,
					isOnline ? "bg-emerald-500" : "bg-[#C7C7CC] dark:bg-[#636366]",
				)}
				aria-hidden
			/>
			<span className="sr-only">{isOnline ? Translate("Online") : Translate("Offline")}</span>
		</div>
	);
}
