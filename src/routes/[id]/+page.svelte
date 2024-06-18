<script lang="ts">
	import { page } from '$app/stores';
	import { auto } from '$lib/auto';

	const { doc_id } = $page.params;

	const foobar = auto(doc_id, 'foo', 'bar');
</script>

<textarea use:foobar.action />

<p>
	{foobar.state}
</p>

<style>
	textarea {
		width: 100%;
		height: 100%;
		padding: 3rem;
	}
</style>
