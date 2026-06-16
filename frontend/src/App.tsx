import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { ThemeProvider } from "./context/theme-context";
import { WallpaperProvider } from "./context/wallpaper-context";

function App() {
	return (
		<ThemeProvider>
			<WallpaperProvider>
				<h1>Hello</h1>

				<header>
					<Show when="signed-out">
						<SignInButton />
						<SignUpButton />
					</Show>
					<Show when="signed-in">
						<UserButton />
					</Show>
				</header>
			</WallpaperProvider>
		</ThemeProvider>
	);
}

export default App;
