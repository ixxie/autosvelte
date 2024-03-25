import { getContext, setContext } from "svelte";

import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';

import type { AutomergeRepoContext } from './types.js';
import { AutomergeRepoState } from "./state.svelte.js";
import { ctx_id } from './ctx.id.js';

export const useRepo = <T>(config?: ConstructorParameters<typeof Repo>[0]) => {
    const ctx = getContext<AutomergeRepoContext<T>>(ctx_id) ?? {
        repo: new AutomergeRepoState<T>(config ?? {
            storage: new IndexedDBStorageAdapter(),
            network: []
        })
    }
    setContext<AutomergeRepoContext<T>>
    return ctx;
}