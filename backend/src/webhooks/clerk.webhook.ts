import { verifyWebhook } from "@clerk/backend/webhooks";
import { Router } from "express";
import User from "../models/user.model";

const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

if (!CLERK_WEBHOOK_SIGNING_SECRET) {
	throw new Error("Set your Clerk Webhook Signing Secret to .env file");
}

export const clerkWebhookRouter = Router();

clerkWebhookRouter.post("/", async (req, res) => {
	try {
		if (!CLERK_WEBHOOK_SIGNING_SECRET) {
			res.status(503).json({ message: "Clerk Webhook Signing Secret is not provided." });
			return;
		}

		//! Normalize Node headers into Fetch Headers
		const headers = new Headers();

		for (const [key, value] of Object.entries(req.headers)) {
			if (Array.isArray(value)) {
				headers.set(key, value.join(","));
			} else if (typeof value === "string") {
				headers.set(key, value);
			}
		}

		//! Clerk's verifier expects a Web Request with the raw body; express.raw gives a Buffer.
		const payload = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body);
		const request = new Request("http://internal/webhooks/clerk", {
			method: "POST",
			headers,
			body: payload,
		});

		//! Throws if the signature is wrong or the body was tampered with; only then do we trust event.
		const event = await verifyWebhook(request, { signingSecret: CLERK_WEBHOOK_SIGNING_SECRET });

		if (event.type === "user.created" || event.type === "user.updated") {
			const user = event.data;

			const email =
				user.email_addresses?.find((e) => e.id === user.primary_email_address_id)?.email_address ?? user.email_addresses?.[0]?.email_address;
			const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || email?.split("@")[0];

			await User.findOneAndUpdate(
				{ clerkId: user.id },
				{ clerkId: user.id, email, fullName, profilePic: user.image_url },
				{ new: true, upsert: true, setDefaultsOnInsert: true },
			);
		}

		if (event.type === "user.deleted") {
			if (event.data.id) await User.findOneAndDelete({ clerkId: event.data.id });
		}

		res.status(200).json({ received: true });
	} catch (error) {
		console.log(`Error in Clerk Webhook: ${error}`);
		res.status(400).json({ message: "Webhook verification failed." });
	}
});
