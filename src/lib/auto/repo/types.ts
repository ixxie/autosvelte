import { AutomergeRepoState } from "./state.svelte";

export interface AutomergeRepoContext<T> {
    repo: AutomergeRepoState<T>;
}