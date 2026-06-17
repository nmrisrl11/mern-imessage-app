import { type RefObject, useEffect, useRef } from "react";

/**
 * Scrolls a container to the bottom when `threadKey` or `lastItemId` changes
 * (e.g. new message or switched conversation). Returns a ref for the scrollable element.
 * * @template T - The type of HTML Element the ref will attach to (defaults to HTMLDivElement)
 * @param threadKey - The current conversation/thread identifier
 * @param lastItemId - The ID of the last message/item to trigger a scroll on new items
 */

function useScrollToBottom<T extends HTMLElement = HTMLDivElement>(
	threadKey?: string | number | null,
	lastItemId?: string | number | null,
): RefObject<T | null> {
	const scrollRef = useRef<T | null>(null);

	useEffect(() => {
		if (!threadKey && lastItemId === undefined) return;
		if (!threadKey) return;

		const el = scrollRef.current;
		if (!el) return;

		const scrollToBottom = () => {
			el.scrollTop = el.scrollHeight;
		};

		scrollToBottom();
		requestAnimationFrame(scrollToBottom);
	}, [threadKey, lastItemId]); //! Effect re-runs safely when either value changes

	return scrollRef;
}

export default useScrollToBottom;
