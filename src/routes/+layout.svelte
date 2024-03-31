<script lang="ts">
	import { useRepo } from '$lib/auto/';
	import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
	import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';

	import type { DocSchema } from './types';
	import './app.css';

	const { children } = $props();

	useRepo<DocSchema>({
		storage: new IndexedDBStorageAdapter(),
		network: [new BrowserWebSocketClientAdapter('wss://sync.automerge.org')]
	});
</script>

{@render children()}
