import AuthHeader from "@/components/auth/auth-header";
import HeroIllustration from "@/components/hero-illustration";
import { useWallpaper } from "@/context/wallpaper";

function NotFoundPage() {
	const { frameStyle } = useWallpaper();

	return (
		<div className="box-border flex min-h-dvh flex-col p-3 sm:p-5 md:p-8" style={frameStyle}>
			<div className="mx-auto flex w-full max-w-368 flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-background text-foreground">
				<AuthHeader />

				<main className="flex flex-1">
					<HeroIllustration />
				</main>
			</div>
		</div>
	);
}

export default NotFoundPage;
