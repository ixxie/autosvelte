import { DocHandle } from "@automerge/automerge-repo"
import type { Doc, ChangeFn } from '@automerge/automerge'

import { patch as applyPatch } from "../patch";

export class AutomergeDocState<T> {
    readonly handle: DocHandle<T>
    state: T | undefined = $state(undefined)

    constructor(handle: DocHandle<T>) {
        this.handle = handle;
        this.handle.doc()
            .then((doc) => {
                this.state = doc;
            })

        this.handle.on('change', ({ patches }) => {
            patches.forEach(
                (patch) => {
                    if (this.state) {
                        applyPatch<T>(this.state, patch)
                    }
                }
            )
        })
    }

    change(callback: ChangeFn<T>) {
        this.handle.change(callback)
    }
}
