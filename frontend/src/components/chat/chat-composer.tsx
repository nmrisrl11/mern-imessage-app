import { Button, TextArea } from "@heroui/react";
import { ImageIcon, LoaderIcon, SendHorizontalIcon } from "lucide-react";
import { type ChangeEvent, type KeyboardEvent, useRef } from "react";
import useKeyboardSound from "@/hooks/use-keyboard-sound";
import { useSelectedConversation } from "@/hooks/use-selected-conversation";
import { useChatStore } from "@/store/use-chat-store";

export function ChatComposer() {
	const composerText = useChatStore((state) => state.composerText);
	const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
	const sendMediaMessage = useChatStore((state) => state.sendMediaMessage);
	const isSendingMedia = useChatStore((state) => state.isSendingMedia);
	const sendTextMessage = useChatStore((state) => state.sendTextMessage);
	const setComposerText = useChatStore((state) => state.setComposerText);

	const { activeConversationId } = useSelectedConversation();
	const { playRandomKeyStrokeSound } = useKeyboardSound();

	const mediaInputRef = useRef<HTMLInputElement>(null);

	const playSoundIfEnabled = () => {
		if (isSoundEnabled) playRandomKeyStrokeSound();
	};

	const handleSend = async () => {
		const didSendMessage = await sendTextMessage(activeConversationId);
		if (didSendMessage) playSoundIfEnabled();
	};

	const handleComposerTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setComposerText(event.target.value);
		playSoundIfEnabled();
	};

	const handleMediaPick = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = ""; //! Reset the input so the same file can be selected again

		if (!file) return;

		const didSendMessage = await sendMediaMessage({
			conversationId: activeConversationId,
			file,
		});

		if (didSendMessage) playSoundIfEnabled();
	};

	return (
		<footer className="shrink-0 border-t border-border px-1.5 pb-2 pt-2 sm:px-2">
			{isSendingMedia ? (
				<div className="mx-auto mb-2 flex max-w-full items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-muted">
					<LoaderIcon className="size-4 shrink-0 animate-spin text-accent" strokeWidth={2} aria-hidden />
					<span className="truncate">Uploading media...</span>
				</div>
			) : null}
			<div className="mx-auto flex w-full max-w-full items-end gap-1.5 px-0.5 sm:gap-2 sm:px-1">
				<input
					ref={mediaInputRef}
					type="file"
					accept="image/*,video/*"
					className="sr-only"
					disabled={isSendingMedia}
					tabIndex={-1}
					aria-hidden
					onChange={handleMediaPick}
				/>
				<Button
					variant="ghost"
					isIconOnly
					isDisabled={isSendingMedia}
					className="size-9 shrink-0 touch-manipulation self-end text-accent"
					onPress={() => mediaInputRef.current?.click()}
				>
					<ImageIcon className="size-5 sm:size-6" strokeWidth={2} />
				</Button>
				<TextArea
					fullWidth
					variant="secondary"
					placeholder="iMessage"
					rows={1}
					value={composerText}
					onChange={handleComposerTextChange}
					onKeyDown={(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							handleSend();
						}
					}}
					className="flex-1 rounded-full"
				/>

				<Button variant="primary" isIconOnly isDisabled={!composerText.trim()} onPress={handleSend}>
					<SendHorizontalIcon className="size-5" />
				</Button>
			</div>
		</footer>
	);
}
