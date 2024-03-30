<script lang="ts">
	import { page } from '$app/stores';

	import { useRepo } from '$lib/auto';
	import { onDestroy } from 'svelte';

	import type { AnyDocumentId } from '@automerge/automerge-repo';

	import type { DocSchema } from '../types';

	const { repo } = useRepo<DocSchema>();

	const { id } = $page.params;

	const doc = repo.find(id as AnyDocumentId);

	let title = doc.prop('title');
	let content = doc.prop('content');

	onDestroy(() => [doc, title, content].forEach((obj) => obj.cleanup()));
</script>

<h2>
	<input type="text" bind:value={title.state} />
</h2>
<textarea bind:value={content.state} />
