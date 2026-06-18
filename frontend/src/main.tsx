import { ClerkProvider } from "@clerk/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";
import Loader from "./components/loader";
import "./i18n";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<App />
				</Suspense>
			</BrowserRouter>
		</ClerkProvider>
	</StrictMode>,
);
