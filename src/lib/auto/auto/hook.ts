
import type { Prop } from '@automerge/automerge'
import type { DocumentId } from "@automerge/automerge-repo";

import { useRepo } from '$lib/auto/repo';
import { getProperty } from '../utils';

export function auto<T>(...args: [DocumentId, ...Array<Prop>]) {

    const [docId, ...path] = args;
    const { repo } = useRepo();
    const doc = repo.find<T>(docId)

    const prop = getProperty(doc, path)
}