// Chat media is stored on ImageKit, so we optimize delivery on the fly via URL
// transformations instead of shipping the full-resolution originals.
// https://imagekit.io/docs/image-transformation

//! Checks if a given value is a valid ImageKit URL string.
export function isImageKitUrl(url: unknown): boolean {
	return typeof url === "string" && url.includes("ik.imagekit.io");
}

//! Append a `tr` query param to an ImageKit URL (no-op for other URLs).
export function withTransform(url: string, transform: string): string {
	//! If it's not an ImageKit URL, return it as-is
	if (!isImageKitUrl(url)) return url;

	//! url.split("?") returns an array, we assign the first two elements. Default query to an empty string if there are no existing query parameters.
	const [path, query = ""] = url.split("?");
	const params = new URLSearchParams(query);

	params.set("tr", transform);

	return `${path}?${params.toString()}`;
}
