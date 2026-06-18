import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import useScrollToBottom from "@/hooks/use-scroll-to-bottom";
import { useSelectedConversation } from "@/hooks/use-selected-conversation";
import { MessageBubble } from "./message-bubble";
import { NoConversationPlaceholder } from "./no-conversation-placeholder";

export function MessageList(): JSX.Element {
	const { t: Translate } = useTranslation("translation", {
		keyPrefix: "Text",
	});

	const { activeConversation, activeConversationId } = useSelectedConversation();

	const lastMessageId = activeConversation?.messages.at(-1)?.id;

	const messagesScrollRef = useScrollToBottom<HTMLDivElement>(activeConversationId, lastMessageId);

	return (
		<div className="relative flex flex-1 flex-col overflow-hidden">
			{activeConversation ? (
				<div ref={messagesScrollRef} className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-2 py-3 sm:px-3 sm:py-4">
					<p className="mb-3 text-center text-[11px] font-medium uppercase tracking-wide text-muted">{Translate("Today")}</p>
					{activeConversation.messages.map((message) => (
						<MessageBubble key={message.id} message={message} />
					))}
				</div>
			) : (
				<NoConversationPlaceholder />
			)}
		</div>
	);
}
