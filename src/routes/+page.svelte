<script lang="ts">
	import { useRepo } from '$lib/auto/';

	import type { DocSchema } from './types';

	const { repo } = useRepo<DocSchema>();

	$inspect(repo.docs);
</script>

<!--{JSON.stringify(repo.docs)} -->

<h1>my docs</h1>
{#each repo.docs as doc}
	{@const id = doc.handle.documentId}
	{@const title = doc.state?.title ?? 'untitled'}
	<a href="/{id}">{title}</a>
{/each}

<button
	onclick={() => {
		repo.create({
			title: '',
			content: ''
		});
	}}
>
	new
</button>
