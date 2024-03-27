import { AutoRepoState } from "./state.svelte";

export interface AutoRepoContext<T> {
    repo: AutoRepoState<T>;
}