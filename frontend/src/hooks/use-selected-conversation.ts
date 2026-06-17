import { formatMessageTime } from "@/lib/utils";
import { type User, useAuthStore } from "@/store/use-auth-store";
import { type Message, useChatStore } from "@/store/use-chat-store";
import { useMediaQuery } from "./use-media-query";

export interface UIMessage {
	id: string;
	role: "me" | "them";
	text: string;
	time: string;
	imageUrl?: string;
	videoUrl?: string;
}

export interface PeerInfo {
	name: string;
	subtitle: string;
	isOnline: boolean;
	avatarUrl: string;
	initials: string;
}

export interface MappedConversation {
	id: string;
	peer: PeerInfo;
	messages: UIMessage[];
}

interface MapUserArgs {
	user: User;
	messages: Message[];
	authUser: User | null;
	onlineUsers: string[];
}

interface UseSelectedConversationReturn {
	activeConversation: MappedConversation | null;
	activeConversationId: string | null;
	isLargeScreen: boolean;
}

//! Sample: John Doe -> JD
export function getInitials(name: string): string {
	return name
		.split(" ")
		.filter(Boolean)
		.map((namePart) => namePart[0])
		.join("");
}

//! mapUserToConversation is an adapter — it converts the raw backend shapes into the clean view-model that the chat UI components expect to render.
function mapUserToConversation({ user, messages, authUser, onlineUsers }: MapUserArgs): MappedConversation {
	const mappedMessages: UIMessage[] = messages.map((message) => ({
		id: message._id,
		role: String(message.senderId) === String(authUser?._id) ? "me" : "them",
		text: message.text || "",
		time: formatMessageTime(message.createdAt),
		imageUrl: message.image,
		videoUrl: message.video,
	}));

	return {
		id: user._id,
		peer: {
			name: user.fullName,
			subtitle: user.email,
			isOnline: onlineUsers.includes(user._id),
			avatarUrl: user.profilePic,
			initials: getInitials(user.fullName),
		},
		messages: mappedMessages,
	};
}

export function useSelectedConversation(): UseSelectedConversationReturn {
	const activeConversationId = useChatStore((state) => state.activeConversationId);
	const conversations = useChatStore((state) => state.conversations);
	const users = useChatStore((state) => state.users);
	const messages = useChatStore((state) => state.messages);

	const authUser = useAuthStore((state) => state.authUser);
	const onlineUsers = useAuthStore((state) => state.onlineUsers);

	const isLargeScreen = useMediaQuery("(min-width: 1024px)");

	const selectedUser = activeConversationId
		? users.find((user) => user._id === activeConversationId) || conversations.find((user) => user._id === activeConversationId)
		: null;

	const activeConversation = selectedUser
		? mapUserToConversation({
				user: selectedUser,
				messages,
				authUser,
				onlineUsers,
			})
		: null;

	return {
		activeConversation,
		activeConversationId,
		isLargeScreen,
	};
}
