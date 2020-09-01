/**
 * Represents a constructor of [[Error]] or one of its subclasses. Primarily
 * used when specifying which type of error will be caught.
 */
export type ThrowableType = new () => Error

/**
 * A function containing the code to be executed as part of a try block.
 *
 * @category Block
 */
export type TryBlock = () => void

/**
 * A function containing the code to be executed as part of a catch block.
 *
 * @category Block
 */
export type CatchBlock =
  /**
   * @param e the caught (and matched) error to be handled
   */
  (e: Error) => void

/**
 * A function containing the code to be executed as part of a finally block.
 *
 * @category Block
 */
export type FinallyBlock = () => void

/**
 * A mapping of [[Error]] types to their corresponding [[CatchBlock]].
 */
export type CatchMap = { [key: string]: CatchBlock }

/**
 * Initializes a new try/catch/finally sequence.
 *
 * ```
 * Try(() => {
 *   // Do something...
 * })
 * .Catch(Exception, e => {
 *   // Handle a caught error of type Exception.
 * })
 * .Finally(() => {
 *   // Do something else...
 * })
 * .Done()
 * ```
 *
 * @param callback the function to be executed as the try block
 */
export default function Try (callback: TryBlock) {
  return new Runner().Try(callback)
}

/**
 * Manages incoming errors from within a catch block. All unmatched errors will
 * be re-thrown.
 *
 * ```
 * try {
 *   // Do something...
 * } catch (e) {
 *   Handle(e, {
 *     Exception: e => {
 *       // Handle a caught error of type Exception.
 *     },
 *     ReferenceError: e => {
 *       // Handle a caught error of type ReferenceError.
 *     }
 *   })
 * }
 * ```
 *
 * @param e the caught error to be handled
 * @param catches the [[CatchBlock]]s to be used for each type of expected error
 */
export function Handle (e: Error, catches: CatchMap) {
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

/**
 * This is the recommended parent class for implenmenting custom exceptions.
 * Extending this class will ensure the prototype chain is preserved in cases
 * where extending the native [[Error]] class would not. <sup>*</sup>
 *
 * <sup>*</sup> _See
 * [this discussion](https://stackoverflow.com/questions/41102060/typescript-extending-error-class)
 * for context._
 */
export class Exception extends Error {
  constructor (message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * Orchestrates the execution of a try/catch/finally sequence.
 *
 * ```
 * const runner = new Runner()
 *
 * runner.Try(() => {
 *    // Do something...
 * })
 * .Catch(Exception, e => {
 *    // Handle any expected errors.
 * })
 * .Finally(() => {
 *    // Optionally do something regardless of what happens.
 * })
 * .Done()
 * ```
 */
export class Runner {
  /**
   * The function to be executed as the try block.
   */
  protected try: TryBlock = () => undefined

  /**
   * A mapping of error types to [[CatchBlocks]] intended to handle them.
   */
  protected catches: CatchMap = {}

  /**
   * The function to be executed as the finally block.
   */
  protected finally: FinallyBlock = () => undefined

  /**
   * Sets the try block.
   *
   * @param callback the function to be executed as the try block
   */
  Try (callback: TryBlock) {
    this.try = callback
    return this
  }

  /**
   * Adds a catch block for a specific error type.
   *
   * @param t the type of error handled by the catch block
   * @param callback the function to be executed as the catch block
   */
  Catch (t: ThrowableType, callback: CatchBlock) {
    this.catches[t.name] = callback
    return this
  }

  /**
   * Sets the finally block.
   *
   * @param callback the function to be executed as the finally block
   */
  Finally (callback: FinallyBlock) {
    this.finally = callback
    return this
  }

  /**
   * Executes a fully initialized [[Runner]]. Any errors thrown that don't have
   * a matching [[CatchBlock]] will automatically be re-thrown.
   */
  Done () {
    try {
      this.try()
    } catch (e) {
      Handle(e, this.catches)
    } finally {
      this.finally()
    }
  }
}
