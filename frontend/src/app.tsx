import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Loader from "./components/loader";
import { ThemeProvider } from "./context/theme-context";
import { WallpaperProvider } from "./context/wallpaper-context";
import AuthPage from "./pages/auth-page";
import ChatPage from "./pages/chat-page";
import { useAuthStore } from "./store/use-auth-store";

function App() {
	const { isSignedIn, isLoaded } = useAuth();
	const checkAuth = useAuthStore((state) => state.checkAuth);
	const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
	const clearAuth = useAuthStore((state) => state.clearAuth);

	useEffect(() => {
		if (!isLoaded) return;

		if (isSignedIn) checkAuth();
		else clearAuth();
	}, [isLoaded, isSignedIn, checkAuth, clearAuth]);

	if (!isLoaded || (isSignedIn && isCheckingAuth)) return <Loader />;

	return (
		<ThemeProvider>
			<WallpaperProvider>
				<Routes>
					<Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to="/auth" replace />} />
					<Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />} />
				</Routes>

				<Toaster />
			</WallpaperProvider>
		</ThemeProvider>
	);
}

export default App;
