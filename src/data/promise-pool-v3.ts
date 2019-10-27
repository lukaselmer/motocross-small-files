export async function allSettled<T>(startPromises: (() => Promise<T>)[], concurrency = 5): Promise<T[]> {
  const workers = new Array(concurrency).fill(null).map(() => startWorker(startPromises))
  return (await Promise.all(workers)).flat()
}

async function startWorker<T>(promisesToStart: (() => Promise<T>)[]) {
  const results: T[] = []
  while (promisesToStart.length > 0) results.push(await promisesToStart.pop()!())
  return results
}
