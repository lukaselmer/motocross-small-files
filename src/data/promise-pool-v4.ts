export async function allSettled<T>(startPromises: (() => Promise<T>)[], concurrency = 5): Promise<T[]> {
  const workers = new Array(concurrency).fill(0).map(() => spread(startWorker(startPromises)))
  return (await Promise.all(workers)).flat()
}

async function* startWorker<T>(promisesToStart: (() => Promise<T>)[]) {
  while (promisesToStart.length > 0) yield await promisesToStart.pop()!()
}

async function spread<T>(x: AsyncGenerator<T, void, void>) {
  const arr = []
  for await (const z of x) arr.push(z)
  return arr
}
