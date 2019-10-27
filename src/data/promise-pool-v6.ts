export async function allSettled<T>(startPromises: (() => Promise<T>)[], concurrency = 5): Promise<T[]> {
  const counter = createCounter()
  const workers = times(concurrency).map(() => asyncSpread(startWorker(startPromises, counter)))
  const results = (await Promise.all(workers)).flat()
  return results.reduce(
    (sortedResults, [index, result]) => {
      sortedResults[index] = result
      return sortedResults
    },
    [] as T[]
  )
}

async function* startWorker<T>(startPromises: (() => Promise<T>)[], counter: Generator<number, void>) {
  while (startPromises.length > 0)
    yield [counter.next().value as number, await startPromises.shift()!()] as const
}

function* createCounter() {
  let count = 0
  while (true) yield count++
}

function times(times: number) {
  return new Array(times).fill(null)
}

async function asyncSpread<T>(generator: AsyncGenerator<T, void, void>) {
  const results = []
  for await (const result of generator) results.push(result)
  return results
}
