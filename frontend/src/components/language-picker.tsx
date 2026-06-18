import type { Key } from "@heroui/react";
import { Description, Header, Label, ListBox, Select } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { Languages } from "@/constants/languages";

export default function LanguagePicker() {
	const { i18n, t: Translate } = useTranslation("translation", {
		keyPrefix: "Text",
	});

	return (
		<Select
			className="w-full"
			placeholder={Translate("Select Language")}
			value={i18n.resolvedLanguage}
			onChange={(value: Key | null) => {
				if (value) {
					i18n.changeLanguage(value.toString());
				}
			}}
		>
			<Select.Trigger className="bg-transparent shadow-none">
				<Select.Value>
					{({ defaultChildren, isPlaceholder }) => {
						// Fallback to placeholder if no language is resolved yet
						if (isPlaceholder || !i18n.resolvedLanguage) {
							return defaultChildren;
						}

						// Look up the selected language data directly using the controlled state
						const selectedLanguage = Languages.find((lang) => lang.languageCode === i18n.resolvedLanguage);

						if (!selectedLanguage) {
							return defaultChildren;
						}

						return (
							<div className="flex items-center gap-2">
								<div className="flex shrink-0 items-center">{selectedLanguage.icon}</div>
							</div>
						);
					}}
				</Select.Value>
				<Select.Indicator />
			</Select.Trigger>

			<Select.Popover>
				<ListBox>
					<ListBox.Section>
						<Header>{Translate("Select Language")}</Header>

						{Languages.map((language) => (
							<ListBox.Item key={language.languageCode} id={language.languageCode} textValue={language.label}>
								<div className="flex items-center gap-2">
									<div className="flex shrink-0 items-center">{language.icon}</div>

									<div className="flex flex-col">
										<Label>{language.label}</Label>
										<Description>{language.languageCode}</Description>
									</div>
								</div>

								<ListBox.ItemIndicator />
							</ListBox.Item>
						))}
					</ListBox.Section>
				</ListBox>
			</Select.Popover>
		</Select>
	);
}
