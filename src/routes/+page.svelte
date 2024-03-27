<script lang="ts">
	import { useRepo } from '$lib/auto/';

	import type { DocSchema } from './types';

	const { repo } = useRepo<DocSchema>();

	$inspect('page', repo.docs);
</script>

<h1>my docs</h1>

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

<ul>
	{#each repo.docs as doc}
		{@const id = doc.handle.documentId}
		{#if doc.state}
			{@const { title } = doc.state}
			{@const label = title.length > 0 ? title : 'untitled'}
			<li>
				<a href="/{id}">{label}</a>
			</li>
		{/if}
	{/each}
</ul>
