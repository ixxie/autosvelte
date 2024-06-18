import type { Prop, Doc } from "@automerge/automerge"
import type { DocumentId } from "@automerge/automerge-repo";
import { updateText } from "@automerge/automerge/next"

import { getProperty } from "$lib/auto/utils"
import { useRepo } from "$lib/auto/repo";
import type { AutoDocState } from "$lib/auto/doc"

export class AutoTextState<T> {
    readonly path: Prop[];
    #doc: AutoDocState<T>
    #pending = $state(0)
    #buffer = $state()
    #read = $derived.by(() => this.#pending
        ? this.#buffer
        : getProperty(this.#doc.state, this.path)
    )

    constructor(...args: [DocumentId, ...Array<Prop>]) {
        const [docId, ...path] = args;
        const { repo } = useRepo();
        this.path = path;
        this.#doc = repo.find<T>(docId)
    }

    set state(value: string) {
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