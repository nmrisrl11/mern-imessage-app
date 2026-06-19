import { Button } from "@heroui/react";
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import HeroPattern from "./hero-pattern";

function HeroIllustration(): JSX.Element {
	const navigate = useNavigate();
	const { t: Translate } = useTranslation("translation", {
		keyPrefix: "Text",
	});

	const handleBackToHome = (): void => {
		navigate("/");
	};

	return (
		<section className={cn("relative flex min-h-[min(320px,42vh)] shrink-0 flex-col overflow-hidden", "bg-[#E8E8ED] dark:bg-black w-full")}>
			<HeroPattern />

			<div className="relative z-1 flex flex-1 flex-col px-6 pb-6 pt-8 md:px-8 md:pb-8 md:pt-10">
				<div className="text-center">
					<p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-[#636366]">
						{Translate("404 Error")}
					</p>

					<h2 className="text-balance font-mono text-[1.15rem] font-semibold leading-snug tracking-[0.06em] text-zinc-900 dark:text-white sm:text-[1.25rem]">
						{Translate("Oops, we couldn't find that page")}
					</h2>

					<p className="mx-auto mt-2.5 max-w-88 text-pretty font-mono text-[11px] font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-[#98989D] md:mx-0 md:max-w-none">
						{Translate("The link may be broken or the page may have been moved Try navigating back or visiting the homepage")}
					</p>
				</div>

				<div className="flex flex-1 items-center justify-center py-6 md:py-4">
					<img
						src="/auth.png"
						alt=""
						width={640}
						height={640}
						className={cn(
							"h-auto max-h-[min(44vh,380px)] w-[min(92%,19rem)]",
							"animate-[auth-float-y_4.5s_ease-in-out_infinite]",
							"object-contain object-center select-none motion-reduce:animate-none",
							"sm:w-[min(88%,21rem)] md:max-h-[min(52vh,440px)] md:w-[min(90%,22rem)]",
						)}
						draggable={false}
						decoding="async"
					/>
				</div>

				<div className="mx-auto w-full max-w-105">
					<Button
						fullWidth
						size="lg"
						variant="primary"
						className={cn(
							"group relative h-13 overflow-hidden rounded-2xl text-[15px] font-semibold",
							"shadow-xl shadow-accent/45 dark:shadow-accent/35",
							"after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl",
							"after:shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
							"dark:after:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
						)}
						onPress={handleBackToHome}
					>
						{Translate("Back to Home")}
					</Button>
				</div>
			</div>
		</section>
	);
}

export default HeroIllustration;
