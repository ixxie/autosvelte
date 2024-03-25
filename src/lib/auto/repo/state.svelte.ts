import { Repo, DocHandle, type AnyDocumentId } from '@automerge/automerge-repo';

import { AutomergeDocState } from '../doc';

export class AutomergeRepoState<T> {
    #repo: Repo
    #docs: { [id: string]: AutomergeDocState<T> } = $state({})

    constructor(config: ConstructorParameters<typeof Repo>[0]) {
        this.#repo = new Repo(config)
        this.#repo.on("document", ({ handle }) => {
            this.#docs[handle.documentId] = new AutomergeDocState(handle);
        });
        this.#repo.on("delete-document", ({ documentId }) => {
            delete this.#docs[documentId];
        });
    }

    get docs() {
        return Object.values(this.#docs);
    }

    doc(documentId: string) {
        return this.#docs[documentId];
    }

    clone(clonedHandle: DocHandle<T>) {
        return this.#repo.clone(clonedHandle)
    }
    create(initialValue?: T) {
        const handle = this.#repo.create<T>(initialValue)
        return new AutomergeDocState(handle)
    }
    delete(id: AnyDocumentId) {
        this.#repo.delete(id)
    }
    export(id: AnyDocumentId) {
        return this.#repo.export(id)
    }
    find(id: AnyDocumentId) {
        return this.#repo.find<T>(id)
    }
    import(binary: Uint8Array) {
        return this.#repo.import<T>(binary)
    }
}