export async function allSettled<T>(startPromises: (() => Promise<T>)[], concurrency = 5): Promise<T[]> {
  const results: T[] = []
  const workers = new Array(concurrency).fill(0).map(async () => {
    while (startPromises.length > 0) results.push(await startPromises.pop()!())
  })
  await Promise.all(workers)
  return results
}
