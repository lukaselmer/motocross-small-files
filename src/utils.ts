export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends readonly (infer U)[]
  ? U
  : T extends Promise<infer U>
  ? U
  : T extends Set<infer U>
  ? U
  : never

export function assertNever(obj: never): never {
  throw new Error(`Unexpected value for object ${obj}`)
}
