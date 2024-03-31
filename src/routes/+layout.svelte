<script lang="ts">
	import { useRepo } from '$lib/auto/';
	import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
	import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';

	import type { DocSchema } from './types';

	const { children } = $props();

	useRepo<DocSchema>({
		storage: new IndexedDBStorageAdapter(),
		network: [new BrowserWebSocketClientAdapter('wss://sync.automerge.org')]
	});
</script>

{@render children()}

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(html, body) {
		height: 100%;
	}
</style>
