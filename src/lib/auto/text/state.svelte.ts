import { getProperty } from "../patch/helpers"
import type { AutoDocState } from "../doc"

import type { Prop, Doc } from "@automerge/automerge"
import { updateText } from "@automerge/automerge/next"


export class AutoTextState<T> {
    readonly path: Prop[];
    #doc: AutoDocState<T>
    #write = $state('')
    cleanup: () => void;

    constructor(doc: AutoDocState<T>, path: Prop[]) {
        this.path = path;
        this.#doc = doc

        this.cleanup = $effect.root(() => {
            $effect(() => {
                this.#doc.change((doc) => {
                    console.log(path, this.#write)
                    updateText(doc as Doc<unknown>, path, this.#write)
                })
            })
        })
    }

    set state(value: string) {
        this.#write = value
    }

    get state() {
        return getProperty(this.#doc.state, this.path)
    }
}