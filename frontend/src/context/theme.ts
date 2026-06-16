import { createContext, type Dispatch, type SetStateAction, useContext } from "react";
import { DEFAULT_THEME_PRESET_ID, HERO_UI_THEME_PRESETS, type ThemePresetId } from "../data/heroui-theme-presets";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
	theme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
	toggleTheme: () => void;
	themePreset: ThemePresetId;
	setThemePreset: Dispatch<SetStateAction<ThemePresetId>>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const PRESET_IDS = new Set<ThemePresetId>(HERO_UI_THEME_PRESETS.map((preset) => preset.id));

export function isValidThemePreset(presetId: string): presetId is ThemePresetId {
	return PRESET_IDS.has(presetId as ThemePresetId);
}

/** Apply preset to `<html>` immediately so `--accent` updates before paint. */
export function applyThemePresetToDocument(presetId: ThemePresetId): void {
	const id = isValidThemePreset(presetId) ? presetId : DEFAULT_THEME_PRESET_ID;

	document.documentElement.setAttribute("data-theme-preset", id);
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);

	if (ctx === null) {
		throw new Error("useTheme must be used within ThemeProvider");
	}

	return ctx;
}
