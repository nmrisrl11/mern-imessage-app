import { useTranslation } from "react-i18next";
import { APP_DATA } from "@/data/app-data";
import { AppLogo } from "../app-logo";
import LanguagePicker from "../language-picker";
import { ThemePresetPicker } from "../theme-preset-picker";
import { ThemeToggle } from "../theme-toggle";
import { WallpaperPicker } from "../wallpaper-picker";

function AuthHeader() {
	const { t: Translate } = useTranslation("translation", {
		keyPrefix: "Text",
	});

	return (
		<header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b border-black/10 bg-[#F6F6F6]/95 px-3 py-2 backdrop-blur-md dark:border-white/10 dark:bg-[#1C1C1E]/95">
			<div className="flex flex-1 items-center gap-2.5 px-1">
				<AppLogo size={30} className="rounded-[7px]" alt="" />

				<div>
					<p className="truncate text-[15px] font-semibold leading-tight">{APP_DATA.name}</p>
					<p className="truncate text-xs text-[#8E8E93] dark:text-[#98989D]">{Translate("Private session")}</p>
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-0.5">
				<LanguagePicker />

				<WallpaperPicker />

				<ThemePresetPicker />

				<ThemeToggle />
			</div>
		</header>
	);
}

export default AuthHeader;
