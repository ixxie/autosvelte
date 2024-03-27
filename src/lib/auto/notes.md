```ts
class AutomergeTextState<T> {
  doc: Doc<T>
  path: string[] // location of the text in the doc
  synced: string = $state('')
  buffer: string = $state('')

  constructor(doc: Doc<T>, path: string[]) {
     this.doc = doc
     this.path = path
     this.on('change', (payload) => this.sync(payload))
  }
  sync({patch}) {
    doc.change((doc) => {
      applyDiff(doc, this.synced, this.buffer)
    })
  }
}
```