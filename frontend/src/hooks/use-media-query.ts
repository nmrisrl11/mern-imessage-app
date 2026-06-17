import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query
 * @param query The media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the document matches the query
 */

export function useMediaQuery(query: string): boolean {
	return useSyncExternalStore(
		//! onChange is a callback provided by React to trigger a re-render
		(onChange: () => void) => {
			const mq: MediaQueryList = window.matchMedia(query);
			mq.addEventListener("change", onChange);

			return () => mq.removeEventListener("change", onChange);
		},
		() => window.matchMedia(query).matches, //! getSnapshot: returns the current state on the client
		() => false, //! getServerSnapshot: returns the initial state for Server-Side Rendering (SSR)
	);
}
