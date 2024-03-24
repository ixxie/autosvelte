import { Repo, DocHandle, type AnyDocumentId } from '@automerge/automerge-repo';

import { AutomergeDocHandleState } from '../doc';

export class AutomergeRepoState<T> {
    #repo: Repo
    #handles: { [id: string]: AutomergeDocHandleState<T> } = $state({})

    constructor(config: ConstructorParameters<typeof Repo>[0]) {
        this.#repo = new Repo(config)
        this.#repo.on("document", ({ handle }) => {
            this.#handles[handle.documentId] = new AutomergeDocHandleState(handle);
        });
        this.#repo.on("delete-document", ({ documentId }) => {
            delete this.#handles[documentId];
        });
    }

    get handles() {
        return Object.values(this.#handles);
    }

    doc(documentId: string) {
        return this.#handles[documentId];
    }

    clone(clonedHandle: DocHandle<T>) {
        return this.#repo.clone(clonedHandle)
    }
    create(initialValue?: T) {
        const handle = this.#repo.create<T>(initialValue)
        return new AutomergeDocHandleState(handle)
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