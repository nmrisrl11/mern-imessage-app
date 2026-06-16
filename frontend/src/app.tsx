import { useAuth } from "@clerk/react";
import { Navigate, Route, Routes } from "react-router";
import Loader from "./components/loader";
import { ThemeProvider } from "./context/theme-context";
import { WallpaperProvider } from "./context/wallpaper-context";
import AuthPage from "./pages/auth-page";
import ChatPage from "./pages/chat-page";

function App() {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) return <Loader />;

	return (
		<ThemeProvider>
			<WallpaperProvider>
				<Routes>
					<Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to="/auth" replace />} />
					<Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />} />
				</Routes>
			</WallpaperProvider>
		</ThemeProvider>
	);
}

export default App;
