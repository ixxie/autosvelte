import { Repo, DocHandle, type AnyDocumentId } from '@automerge/automerge-repo';

import { AutoDocState } from '../doc';

export class AutoRepoState<T> {
    #repo: Repo
    #docs: {
        [id: string]: AutoDocState<T>
    } = $state({})

    constructor(config: ConstructorParameters<typeof Repo>[0]) {
        this.#repo = new Repo(config)
        this.#repo.on("document", ({ handle }) => {
            this.#docs[handle.documentId] = new AutoDocState(handle);
            console.log('document event', this.#docs)
        });
        this.#repo.on("delete-document", ({ documentId }) => {
            delete this.#docs[documentId];
        });
    }

    get docs() {
        return Object.values(this.#docs);
    }

    clone(clonedHandle: DocHandle<T>) {
        return this.#repo.clone(clonedHandle)
    }
    create(initialValue?: T) {
        const handle = this.#repo.create<T>(initialValue)
        const doc = new AutoDocState(handle)
        return doc;
    }
    delete(id: AnyDocumentId) {
        this.#repo.delete(id)
    }
    export(id: AnyDocumentId) {
        return this.#repo.export(id)
    }
    find(id: AnyDocumentId) {
        let doc = this.#docs[id as string];
        if (!doc) {
            const handle = this.#repo.find<T>(id)
            doc = new AutoDocState(handle)
        }
        return doc
    }
    import(binary: Uint8Array) {
        return this.#repo.import<T>(binary)
    }
}