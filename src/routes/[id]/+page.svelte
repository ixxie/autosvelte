<script lang="ts">
	import { page } from '$app/stores';

	import { useRepo } from '$lib/auto';
	import { onDestroy } from 'svelte';

	import type { DocumentId } from '@automerge/automerge-repo';

	import type { DocSchema } from '../types';

	const { repo } = useRepo<DocSchema>();

	const { id } = $page.params;

	const doc = repo.find(id as DocumentId);

	let content = doc.prop('content');

	onDestroy(() => doc.cleanup());
</script>

<textarea bind:value={content.state} />

<style>
	textarea {
		width: 100%;
		height: 100%;
		padding: 3rem;
	}
</style>
