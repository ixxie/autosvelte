<script lang="ts">
	import { page } from '$app/stores';

	import { useRepo } from '$lib/auto';

	import type { DocSchema } from '../types';

	const { repo } = useRepo<DocSchema>();

	const { id } = $page.params;
	const doc = repo.doc(id);

	let title = $state(doc.state?.title ?? '');
	let content = $state(doc.state?.content ?? '');
</script>

<h1>
	<input type="text" bind:value={title} />
</h1>
<textarea bind:value={content} />
<button
	onclick={() => {
		doc.change((doc) => {
			doc.title = title;
			doc.content = content;
		});
	}}
>
	Save
</button>

<h2>result</h2>

<h1>{doc.state?.title}</h1>

<p>{doc.state?.content}</p>
