import { type Dispatch, type JSX, type ReactNode, type SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { DEFAULT_THEME_PRESET_ID, type ThemePresetId } from "../data/heroui-theme-presets";
import { applyThemePresetToDocument, isValidThemePreset, ThemeContext, type ThemeContextValue } from "./theme";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
	if (typeof window === "undefined") return "light";

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme | null {
	const theme = localStorage.getItem("theme");

	if (theme === "light" || theme === "dark") {
		return theme;
	}

	return null;
}

function applyDomTheme(theme: Theme): void {
	const root = document.documentElement;

	root.classList.toggle("dark", theme === "dark");
	root.setAttribute("data-theme", theme);
}

function readStoredThemePreset(): ThemePresetId {
	const themePreset = localStorage.getItem("theme-preset");

	if (themePreset && isValidThemePreset(themePreset)) {
		return themePreset;
	}

	return DEFAULT_THEME_PRESET_ID;
}

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
	const [theme, setThemeState] = useState<Theme>(() => readStoredTheme() ?? getSystemTheme());

	const [themePreset, setThemePresetState] = useState<ThemePresetId>(readStoredThemePreset);

	useLayoutEffect(() => {
		applyDomTheme(theme);
	}, [theme]);

	useLayoutEffect(() => {
		applyThemePresetToDocument(themePreset);
	}, [themePreset]);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		localStorage.setItem("theme-preset", themePreset);
	}, [theme, themePreset]);

	const setTheme: Dispatch<SetStateAction<Theme>> = (next) => {
		setThemeState(next);
	};

	const toggleTheme = (): void => {
		setThemeState((t) => (t === "dark" ? "light" : "dark"));
	};

	const setThemePreset: Dispatch<SetStateAction<ThemePresetId>> = (next) => {
		setThemePresetState((prev) => {
			const resolved = typeof next === "function" ? next(prev) : next;

			return isValidThemePreset(resolved) ? resolved : DEFAULT_THEME_PRESET_ID;
		});
	};

	const value: ThemeContextValue = {
		theme,
		setTheme,
		toggleTheme,
		themePreset,
		setThemePreset,
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
