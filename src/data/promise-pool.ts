export async function allSettled<T>(startPromises: (() => Promise<T>)[], concurrency = 5): Promise<T[]> {
  const workers = arrayOf(concurrency).map(() => spread(startWorker(startPromises)))
  return (await Promise.all(workers)).flat()
}

async function* startWorker<T>(promisesToStart: (() => Promise<T>)[]) {
  while (promisesToStart.length > 0) yield await promisesToStart.pop()!()
}

function arrayOf(size: number) {
  return new Array(size).fill(0)
}

async function spread<T>(x: AsyncGenerator<T, void, void>) {
  const arr = []
  for await (const z of x) arr.push(z)
  return arr
}
