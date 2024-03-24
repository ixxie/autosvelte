<script lang="ts">
	import { useRepo } from '$lib/auto/';
	import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
	import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';

	const { repo } = useRepo<{
		name: string;
		content: string;
	}>({
		storage: new IndexedDBStorageAdapter(),
		network: [new BrowserWebSocketClientAdapter('ws://localhost:3030')]
	});

	let docName = $state('new doc');

	const values = $derived(
		Object.fromEntries(repo.handles.map((handle) => [handle.doc?.name, handle.doc?.content]))
	);
</script>

<input type="text" bind:value={docName} />
<button
	onclick={() => {
		repo.create({
			name: docName,
			content: ''
		});
	}}
>
	create doc
</button>
<h3>docs input</h3>
{#each repo.handles as handle}
	{@const name = handle.doc?.name}
	{#if name}
		<h4>{name}</h4>
		<input type="text" bind:value={values[name]} />
		<button
			onclick={() => {
				handle.change((doc) => {
					doc.content = values[name];
				});
			}}
		>
			Save
		</button>
	{/if}
{/each}

<h3>docs output</h3>
{#each repo.handles as handle}
	{@const name = handle.doc?.name}
	{#if name}
		<h4>{name}</h4>
		{handle.doc?.content}
	{/if}
{/each}
