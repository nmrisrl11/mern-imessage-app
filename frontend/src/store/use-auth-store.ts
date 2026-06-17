import { io, type Socket } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export interface User {
	_id: string;
	clerkId: string;
	email: string;
	fullName: string;
	profilePic: string;
	createdAt?: string;
	updatedAt?: string;
}

interface AuthStore {
	authUser: User | null;
	isCheckingAuth: boolean;
	onlineUsers: string[];
	socket: Socket | null;
	checkAuth: () => Promise<void>;
	clearAuth: () => void;
	connectSocket: (user: User | null) => void;
	disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	authUser: null,
	isCheckingAuth: true,
	onlineUsers: [],
	socket: null,
	checkAuth: async () => {
		set({ isCheckingAuth: true });

		try {
			const res = await axiosInstance.get<User>("/auth/check");
			set({ authUser: res.data });

			get().connectSocket(res.data);
		} catch (error) {
			console.error(`Error in checkAuth: `, error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},
	clearAuth: () => {
		set({ authUser: null, isCheckingAuth: false, onlineUsers: [] });
		get().disconnectSocket();
	},
	connectSocket: (user) => {
		//! Prevent reconnecting if already connected or if no user exists
		if (!user || get().socket?.connected) return;

		const socket = io(BASE_URL, { query: { userId: user._id } });

		set({ socket });

		//! Add strict type for the incoming data payload
		socket.on("getOnlineUsers", (userIds: string[]) => {
			set({ onlineUsers: userIds });
		});
	},
	disconnectSocket: () => {
		const socket = get().socket;
		if (socket?.connected) socket.disconnect();
		set({ socket: null });
	},
}));
