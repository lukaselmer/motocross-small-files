export class PromisePool<T> {
  private startedPromises: Promise<T>[] = []
  private results: T[] = []
  private errors: any[] = []
  private resolve!: (value: T[]) => void
  private reject!: (reason: any) => void
  private done: Promise<T[]>

  static async allSettled<T>(promisesToStart: (() => Promise<T>)[], concurrency = 5) {
    const pool = new PromisePool(promisesToStart, concurrency)
    return pool.allSettled()
  }

  private constructor(private promisesToStart: (() => Promise<T>)[], private concurrency: number) {
    this.done = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  private async allSettled() {
    this.tryStartingPromises()
    return this.done
  }

  private tryStartingPromises() {
    while (this.hasPromisesToStart() && this.shouldStartMorePromises()) this.startPromise()

    if (this.allDone()) this.errors.length === 0 ? this.resolve(this.results) : this.reject(this.errors)
  }

  private startPromise() {
    const start = this.promisesToStart.pop()
    if (!start) throw new Error('Expected promise to exist')
    const promise = start()
    this.startedPromises.push(promise)
    promise
      .then(result => this.results.push(result))
      .catch(err => this.errors.push(err))
      .finally(() => {
        this.startedPromises.splice(this.startedPromises.indexOf(promise), 1)
        this.tryStartingPromises()
      })
  }

  private hasPromisesToStart() {
    return this.promisesToStart.length > 0
  }

  private shouldStartMorePromises() {
    return this.startedPromises.filter(promise => promise).length < this.concurrency
  }

  private allDone() {
    return this.promisesToStart.length === 0 && this.startedPromises.length === 0
  }
}
