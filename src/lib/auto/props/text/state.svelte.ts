import { getProperty } from "$lib/auto/utils"
import type { AutoDocState } from "$lib/auto/doc"

import type { Prop, Doc } from "@automerge/automerge"
import { updateText } from "@automerge/automerge/next"


export class AutoTextState<T> {
    readonly path: Prop[];
    #doc: AutoDocState<T>
    #pending = $state(0)
    #buffer = $state()
    #read = $derived.by(() => this.#pending
        ? this.#buffer
        : getProperty(this.#doc.state, this.path)
    )

    constructor(doc: AutoDocState<T>, path: Prop[]) {
        this.path = path;
        this.#doc = doc
    }

    set state(value: string) {
        console.log('----------')
        console.log("AutoTextState: writing state", value)
        this.#buffer = value
        this.#pending++
        this.#doc.change((doc) => {
            updateText(doc as Doc<unknown>, this.path, value)
        }, () => this.#pending--)
    }

    get state() {
        console.log("AutoTextState: reading text", this.#read)
        return this.#read
    }
}