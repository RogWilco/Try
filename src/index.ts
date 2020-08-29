export type Throwable = new () => Error
export type TryBlock = () => void
export type CatchBlock = (e: Error) => void
export type FinallyBlock = () => void

export default function Try (callback: TryBlock) {
  return new Runner().Try(callback)
}

export class Runner {
  try: TryBlock = () => undefined
  catches: { [key: string]: CatchBlock } = {}
  finally: FinallyBlock = () => undefined

  constructor () {}

  private getCatchBlock (e: Error): CatchBlock | undefined {
    if (e.constructor.name in this.catches) {
      return this.catches[e.constructor.name]
    }

    // Check for a catch block matching a parent class.
    let parent = e.constructor

    while ((parent = Object.getPrototypeOf(parent))) {
      if (parent.name in this.catches) {
        return this.catches[parent.name]
      }
    }

    return
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
      const catchBlock = this.getCatchBlock(e)

      if (!catchBlock) {
        throw e
      }

      catchBlock(e)
    } finally {
      this.finally()
    }
  }
}

export class Exception extends Error {
  constructor (message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
