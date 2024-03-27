import { getContext, setContext } from "svelte";

import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';

import type { AutoRepoContext } from './types.js';
import { AutoRepoState } from "./state.svelte.js";
import { ctx_id } from './ctx.id.js';

export const useRepo = <T>(config?: ConstructorParameters<typeof Repo>[0]) => {
    const ctx = getContext<AutoRepoContext<T>>(ctx_id) ?? {
        repo: new AutoRepoState<T>(config ?? {
            storage: new IndexedDBStorageAdapter(),
            network: []
        })
    }
    setContext<AutoRepoContext<T>>(ctx_id, ctx)
    return ctx;
}