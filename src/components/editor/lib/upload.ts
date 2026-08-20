import { api } from "./api";

/**
 * 上传图片到仓库，返回公开 URL（如 /images/posts/xxx/abc.png）
 * @param file 图片文件
 * @param dir 仓库相对目录，如 "public/images/posts/my-slug" 或 "public/images/diary"
 */
export async function uploadImage(file: File, dir: string): Promise<string> {
	const buf = await file.arrayBuffer();
	const bytes = new Uint8Array(buf);
	const hashBytes = await crypto.subtle.digest("SHA-256", bytes);
	const hash = Array.from(new Uint8Array(hashBytes))
		.slice(0, 8)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	const extn = file.name.split(".").pop() || "png";
	const filename = `${hash}.${extn}`;
	const base64 = btoa(String.fromCharCode(...bytes));
	const path = `${dir}/${filename}`;
	await api.commit({
		path,
		content: base64,
		message: `feat(blog): upload image ${filename}`,
		base64: true,
	});
	// public/images/xxx → /images/xxx
	return path.replace(/^public/, "");
}
