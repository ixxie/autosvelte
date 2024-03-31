import { DocHandle } from "@automerge/automerge-repo"
import type { Doc, ChangeFn, Patch, Prop } from '@automerge/automerge'


import { applyPatch } from "../patch";
import { AutoTextState } from "..";

export class AutoDocState<T> {
    readonly handle: DocHandle<T>
    #read: Doc<T> | undefined = $state(undefined);
    cleanup: () => void

    constructor(handle: DocHandle<T>) {
        this.handle = handle;
        this.handle.doc()
            .then((doc) => this.#read = JSON.parse(JSON.stringify(doc)))

        const apply = async ({ patches }: { patches: Patch[] }) => {
            console.log("AutoDocState: applying patches", patches)
            patches.forEach((patch) => {
                if (this.#read) {
                    applyPatch(this.#read, patch)
                }
            })
        }
        this.handle.on('change', apply)
        this.cleanup = $effect.root(() => () => {
            this.handle.off('change', apply)
        })
    }

    change(callback: ChangeFn<T>) {
        this.handle.whenReady()
            .then(() => this.handle.change(callback))
    }

    get state() {
        return this.#read
    }

    prop(...path: Prop[]) {
        return new AutoTextState(this, path)
    }
}
