<script lang="ts">
	import { marked } from "marked";
	import sanitizeHtml from "sanitize-html";

	export let body = "";

	$: html = sanitizeHtml(marked.parse(body, { async: false }) as string, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat([
			"img",
			"h1",
			"h2",
			"h3",
			"h4",
			"table",
			"thead",
			"tbody",
			"tr",
			"th",
			"td",
			"del",
			"input",
		]),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			img: ["src", "alt", "title", "loading"],
			a: ["href", "name", "target", "rel"],
			input: ["type", "checked", "disabled"],
		},
	});
</script>

<div class="prose dark:prose-invert max-w-none">{@html html}</div>
