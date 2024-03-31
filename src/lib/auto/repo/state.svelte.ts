import { Repo, DocHandle, type DocumentId } from '@automerge/automerge-repo';

import { AutoDocState } from '$lib/auto/doc';

export class AutoRepoState<T> {
    #repo: Repo
    #docs: {
        [id: DocumentId]: AutoDocState<T>
    } = $state({})

    constructor(config: ConstructorParameters<typeof Repo>[0]) {

        this.#repo = new Repo(config)
        this.#repo.on("document", ({ handle }) => {
            if (!(handle.documentId in this.#docs)) {
                this.#docs[handle.documentId] = new AutoDocState(handle);
                console.log('document event', this.#docs)
            }
        });
        this.#repo.on("delete-document", ({ documentId }) => {
            delete this.#docs[documentId];
        });

        let root = localStorage.rootDocUrl
        if (!root) {
            const handle = this.#repo.create<{ docs: [] }>({ docs: [] })
            localStorage.rootDocUrl = root = handle.url
        }
    }

    get docs() {
        return Object.values(this.#docs);
    }

    clone(clonedHandle: DocHandle<T>) {
        return this.#repo.clone(clonedHandle)
    }
    create(initialValue?: T) {
        const handle = this.#repo.create<T>(initialValue)
        if (!(handle.documentId in this.#docs)) {
            this.#docs[handle.documentId] = new AutoDocState(handle, { logging: false });
        }
        return this.#docs[handle.documentId];
    }
    delete(id: DocumentId) {
        this.#repo.delete(id)
    }
    export(id: DocumentId) {
        return this.#repo.export(id)
    }
    find(id: DocumentId) {
        const handle = this.#repo.find<T>(id)
        this.#docs[handle.documentId] = new AutoDocState(handle, { logging: false });
        return this.#docs[handle.documentId];
    }
    import(binary: Uint8Array) {
        return this.#repo.import<T>(binary)
    }
}