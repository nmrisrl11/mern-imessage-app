import { UserButton } from "@clerk/react";
import { SearchField, Tabs } from "@heroui/react";
import { MessageSquareIcon, UsersIcon } from "lucide-react";
import type { Key } from "react";
import { useTranslation } from "react-i18next";
import { APP_DATA } from "@/data/app-data";
import { getInitials, useSelectedConversation } from "@/hooks/use-selected-conversation";
import { cn } from "@/lib/utils";
import { type User, useAuthStore } from "@/store/use-auth-store";
import { useChatStore } from "@/store/use-chat-store";
import { AppLogo } from "../app-logo";
import { ConversationRow } from "./conversation-row";

interface MappedSidebarUser {
	conversationId: string;
	id: string;
	name: string;
	avatarUrl: string;
	initials: string;
	isOnline: boolean;
	peer: {
		name: string;
		avatarUrl: string;
		initials: string;
		isOnline: boolean;
	};
}

function mapUserForList(user: User, onlineUsers: string[]): MappedSidebarUser {
	return {
		conversationId: user._id,
		id: user._id,
		name: user.fullName,
		avatarUrl: user.profilePic,
		initials: getInitials(user.fullName),
		isOnline: onlineUsers.includes(user._id),
		peer: {
			name: user.fullName,
			avatarUrl: user.profilePic,
			initials: getInitials(user.fullName),
			isOnline: onlineUsers.includes(user._id),
		},
	};
}

function ChatSidebar() {
	const { t: Translate } = useTranslation("translation", {
		keyPrefix: "Text",
	});

	const conversations = useChatStore((state) => state.conversations);
	const users = useChatStore((state) => state.users);

	const searchQuery = useChatStore((state) => state.searchQuery);
	const setSearchQuery = useChatStore((state) => state.setSearchQuery);

	const sidebarTab = useChatStore((state) => state.sidebarTab);
	const setSidebarTab = useChatStore((state) => state.setSidebarTab);

	const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);

	const onlineUsers = useAuthStore((state) => state.onlineUsers);

	const { activeConversationId, isLargeScreen } = useSelectedConversation();

	const normalizedSearchQuery = searchQuery.trim().toLowerCase();

	const conversationUsers = conversations.map((user) => mapUserForList(user, onlineUsers));
	const allUsers = users.map((user) => mapUserForList(user, onlineUsers));

	const filteredConversations = normalizedSearchQuery
		? conversationUsers.filter((conversation) => conversation.peer.name.toLowerCase().includes(normalizedSearchQuery))
		: conversationUsers;

	const filteredUsers = normalizedSearchQuery ? allUsers.filter((user) => user.name.toLowerCase().includes(normalizedSearchQuery)) : allUsers;

	return (
		<aside
			className={cn(
				"w-full shrink-0 flex-col overflow-hidden border-r border-border lg:w-72",
				!isLargeScreen && activeConversationId ? "hidden lg:flex" : "flex",
			)}
		>
			<div className="shrink-0 border-b border-border px-2 pb-2 pt-2.5 sm:px-3 sm:pt-3">
				<div className="flex items-center gap-2 px-0.5 sm:gap-2.5 sm:px-1">
					<AppLogo size={32} className="size-8 shrink-0 rounded-[9px] sm:size-8.5" alt="" />
					<p className="flex-1 truncate text-lg font-bold tracking-tight sm:text-[22px]">{APP_DATA.name}</p>
					<UserButton
						appearance={{
							elements: {
								avatarBox: "size-8",
							},
						}}
					/>
				</div>
			</div>

			<Tabs
				selectedKey={sidebarTab}
				onSelectionChange={(key: Key) => setSidebarTab(String(key))}
				variant="secondary"
				className="flex flex-1 flex-col overflow-y-auto"
			>
				<div className="shrink-0 border-b border-border px-3 pb-2 pt-2">
					<SearchField fullWidth variant="secondary" className="w-full" value={searchQuery} onChange={setSearchQuery}>
						<SearchField.Group className="rounded-xl">
							<SearchField.SearchIcon />
							<SearchField.Input placeholder={Translate("Search")} />
							{searchQuery ? <SearchField.ClearButton /> : null}
						</SearchField.Group>
					</SearchField>
				</div>

				<Tabs.ListContainer className="shrink-0 border-b border-border px-2 pb-2 pt-1">
					<Tabs.List className="w-full gap-0.5">
						<Tabs.Tab id="chats" className="flex-1 justify-center gap-1.5">
							<MessageSquareIcon className="size-3.5 opacity-80" aria-hidden />
							{Translate("Chats")}
						</Tabs.Tab>
						<Tabs.Tab id="users" className="flex-1 justify-center gap-1.5">
							<UsersIcon className="size-3.5 opacity-80" aria-hidden />
							{Translate("Users")}
						</Tabs.Tab>
					</Tabs.List>
				</Tabs.ListContainer>

				<Tabs.Panel id="chats" className="flex-1 overflow-x-hidden overflow-y-auto outline-none">
					{filteredConversations.length === 0 ? (
						<p className="px-4 py-6 text-center text-sm text-muted">{Translate("No conversations match your search")}</p>
					) : (
						filteredConversations.map((conversation) => (
							<ConversationRow
								key={conversation.id}
								user={conversation}
								selected={conversation.id === activeConversationId}
								onSelect={() => setActiveConversationId(conversation.id)}
							/>
						))
					)}
				</Tabs.Panel>

				<Tabs.Panel id="users" className="flex-1 overflow-x-hidden overflow-y-auto outline-none">
					{filteredUsers.length === 0 ? (
						<p className="px-4 py-6 text-center text-sm text-muted">{Translate("No people match your search")}</p>
					) : (
						filteredUsers.map((user) => (
							<ConversationRow
								key={user.conversationId}
								user={user}
								selected={user.conversationId === activeConversationId}
								onSelect={() => setActiveConversationId(user.conversationId)}
							/>
						))
					)}
				</Tabs.Panel>
			</Tabs>
		</aside>
	);
}

export default ChatSidebar;
