import FlagFrance from "@/components/icons/flag-france";
import FlagGermany from "@/components/icons/flag-germany";
import FlagJapan from "@/components/icons/flag-japan";
import FlagPortugal from "@/components/icons/flag-portugal";
import FlagSpain from "@/components/icons/flag-spain";
import FlagUSA from "@/components/icons/flag-usa";

export interface LanguagesProps {
	label: string;
	languageCode: string;
	icon: React.ReactNode;
}

export const Languages: LanguagesProps[] = [
	{
		label: "English",
		languageCode: "en-US",
		icon: <FlagUSA className="size-5" />,
	},
	{
		label: "Spanish",
		languageCode: "es-ES",
		icon: <FlagSpain className="size-5" />,
	},
	{
		label: "French",
		languageCode: "fr-FR",
		icon: <FlagFrance className="size-5" />,
	},
	{
		label: "Portuguese",
		languageCode: "pt-PT",
		icon: <FlagPortugal className="size-5" />,
	},
	{
		label: "German",
		languageCode: "de-DE",
		icon: <FlagGermany className="size-5" />,
	},
	{
		label: "Japanese",
		languageCode: "ja-JP",
		icon: <FlagJapan className="size-5" />,
	},
];
