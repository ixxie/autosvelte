import { DocHandle } from "@automerge/automerge-repo"
import type { Doc, ChangeFn } from '@automerge/automerge'

import { patch as applyPatch } from "../patch";

export class AutomergeDocHandleState<T> {
    #handle: DocHandle<T>
    doc: T | undefined = $state(undefined)

    constructor(handle: DocHandle<T>) {
        this.#handle = handle;
        handle.doc()
            .then((doc) => {
                this.doc = structuredClone(doc);
            })

        this.#handle.on('change', ({ patches }) => {
            if (isDefined<T>(this.doc)) {
                const doc = this.doc;
                patches.forEach(
                    (patch) => applyPatch<T>(doc, patch)
                )
            }
        })
    }

    change(callback: ChangeFn<T>) {
        this.#handle.change(callback)
    }
}

function isDefined<T>(val: Doc<T> | undefined): val is Doc<T> {
    return val !== undefined;
}

