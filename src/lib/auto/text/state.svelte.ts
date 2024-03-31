import { getProperty } from "../patch/helpers"
import type { AutoDocState } from "../doc"

import type { Prop, Doc } from "@automerge/automerge"
import { updateText } from "@automerge/automerge/next"


export class AutoTextState<T> {
    readonly path: Prop[];
    #doc: AutoDocState<T>
    #read = $derived.by(() => {
        console.log('derived')
        return getProperty(this.#doc.state, this.path)
    })

    constructor(doc: AutoDocState<T>, path: Prop[]) {
        this.path = path;
        this.#doc = doc
    }

    set state(value: string) {
        console.log('----------')
        console.log("AutoTextState: writing state", value)
        this.#doc.change((doc) => {
            updateText(doc as Doc<unknown>, this.path, value)
        })
    }

    get state() {
        console.trace("AutoTextState: reading text", this.#read)
        return this.#read
    }
}