import { DocHandle } from "@automerge/automerge-repo"
import type { Doc, ChangeFn, Patch, Prop } from '@automerge/automerge'


import { applyPatch } from "$lib/auto/utils";

import { AutoTextState, AutoArrayState } from "$lib/auto/props";

export class AutoDocState<T> {
    readonly handle: DocHandle<T>
    #read: Doc<T> | undefined = $state(undefined);
    cleanup: () => void
    logging: boolean = true

    constructor(handle: DocHandle<T>, config?: { logging?: boolean }) {
        this.handle = handle;
        this.handle.doc()
            .then((doc) => this.#read = JSON.parse(JSON.stringify(doc)))

        const apply = async ({ patches }: { patches: Patch[] }) => {
            patches.forEach((patch) => {
                if (this.#read) {
                    this.log("AutoDocState: applying patch", patch)
                    applyPatch(this.#read, patch)
                }
            })
            this.log('State:', this.#read)
        }
        this.handle.on('change', apply)
        this.cleanup = $effect.root(() => () => {
            this.handle.off('change', apply)
        })

        this.logging = config?.logging ?? true
    }

    change(callback: ChangeFn<T>, finished?: () => void) {
        this.handle.whenReady()
            .then(() => this.handle.change(callback))
        if (finished) finished()
    }

    get state() {
        return this.#read
    }

    prop(...path: Prop[]) {
        return new AutoTextState(this, path)
    }

    log(...messages: any[]) {
        if (this.logging) {
            console.log(...messages)
        }
    }
}
