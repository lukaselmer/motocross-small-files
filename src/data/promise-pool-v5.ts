export async function allSettled<T>(startPromises: (() => Promise<T>)[], concurrency = 5): Promise<T[]> {
  const workers = times(concurrency).map(() => asyncSpread(startWorker(startPromises)))
  return (await Promise.all(workers)).flat()
}

async function* startWorker<T>(startPromises: (() => Promise<T>)[]) {
  while (startPromises.length > 0) yield await startPromises.pop()!()
}

function times(times: number) {
  return new Array(times).fill(null)
}

async function asyncSpread<T>(generator: AsyncGenerator<T, void, void>) {
  const results = []
  for await (const result of generator) results.push(result)
  return results
}
