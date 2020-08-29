export type Throwable = new () => Error
export type TryBlock = () => void
export type CatchBlock = (e: Error) => void
export type FinallyBlock = () => void
export type CatchMap = { [key: string]: CatchBlock }

export default function Try (callback: TryBlock) {
  return new Runner().Try(callback)
}

export function Handle (e: Error, catches: CatchMap) {
  Runner.Handle(e, catches)
}

export class Exception extends Error {
  constructor (message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class Runner {
  try: TryBlock = () => undefined
  catches: CatchMap = {}
  finally: FinallyBlock = () => undefined

  static Handle (e: Error, catches: CatchMap) {
    if (e.constructor.name in catches) {
      return catches[e.constructor.name](e)
    }

    // Check for a catch block matching a parent class.
    let parent = e.constructor

    while ((parent = Object.getPrototypeOf(parent))) {
      if (parent.name in catches) {
        return catches[parent.name](e)
      }
    }

    throw e
  }

  Try (callback: TryBlock) {
    this.try = callback
    return this
  }

  Catch (t: Throwable, callback: CatchBlock) {
    this.catches[t.name] = callback
    return this
  }

  Finally (callback: FinallyBlock) {
    this.finally = callback
    return this
  }

  Done () {
    try {
      this.try()
    } catch (e) {
      Runner.Handle(e, this.catches)
    } finally {
      this.finally()
    }
  }
}
