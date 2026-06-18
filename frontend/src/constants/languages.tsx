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
		icon: <FlagUSA className="size-5" />,
	},
	{
		label: "French",
		languageCode: "fr-FR",
		icon: <FlagUSA className="size-5" />,
	},
	{
		label: "Portuguese",
		languageCode: "pt-PT",
		icon: <FlagUSA className="size-5" />,
	},
	{
		label: "German",
		languageCode: "de-DE",
		icon: <FlagUSA className="size-5" />,
	},
	{
		label: "Japanese",
		languageCode: "ja-JP",
		icon: <FlagUSA className="size-5" />,
	},
];
