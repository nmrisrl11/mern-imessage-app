import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/theme";

export const THEMES = ["light", "dark"] as const;

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex items-center gap-1 rounded-full border border-default bg-surface p-1 shadow-sm">
			<Button size="sm" variant={theme === "light" ? "primary" : "ghost"} isIconOnly onPress={() => setTheme(THEMES[0])}>
				<Sun className="size-4" />
			</Button>

			<Button size="sm" variant={theme === "dark" ? "primary" : "ghost"} isIconOnly onPress={() => setTheme(THEMES[1])}>
				<Moon className="size-4" />
			</Button>
		</div>
	);
}
