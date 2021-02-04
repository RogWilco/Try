import Try, { Exception, Handle, Rethrow } from './'

class ExceptionOne extends Exception {}
class ExceptionTwo extends Exception {}
class ExceptionThree extends Exception {}
class AnotherError extends Error {}

describe('Try()', () => {
  describe('.Done()', () => {
    test('Just runs when no error is thrown.', () => {
      const tryBlock = jest.fn()

      Try(tryBlock).Done()

      expect(tryBlock).toHaveBeenCalled()
    })

    test('Results in an uncaught(ExceptionOne) when a matching ExceptionOne is thrown.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })

      expect(() => Try(tryBlock).Done()).toThrow(ExceptionOne)

      expect(tryBlock).toHaveBeenCalled()
    })
  })

  describe('.Catch(ExceptionOne)).Done()', () => {
    test('Just runs when no error is thrown.', () => {
      const tryBlock = jest.fn()
      const catchBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).not.toHaveBeenCalled()
    })

    test('Results in an uncaught ExceptionTwo when a non-matching ExceptionTwo is thrown.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionTwo('Waat?')
      })
      const catchBlock = jest.fn()

      expect(() =>
        Try(tryBlock)
          .Catch(ExceptionOne, catchBlock)
          .Done()
      ).toThrow(ExceptionTwo)

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).not.toHaveBeenCalled()
    })

    test('Catch(ExceptionOne) is invoked when a matching error is thrown.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })
      const catchBlock = jest.fn()

      expect(() =>
        Try(tryBlock)
          .Catch(ExceptionOne, catchBlock)
          .Done()
      ).not.toThrow()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).toHaveBeenCalled()
    })
  })

  describe('.Catch(ExceptionOne)).Catch(ExceptionTwo).Done()', () => {
    test('Just runs when no error is thrown.', () => {
      const tryBlock = jest.fn()
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
    })

    test('Results in an uncaught ExceptionThree when a non-matching ErrorThree is thrown.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionThree('Waaat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()

      expect(() => {
        Try(tryBlock)
          .Catch(ExceptionOne, catchBlockOne)
          .Catch(ExceptionTwo, catchBlockTwo)
          .Done()
      }).toThrow(ExceptionThree)

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
    })

    test('Catch(ExceptionOne)) is invoked when a matching(ExceptionOne) is thrown. Catch(ExceptionTwo) is not invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
    })

    test('Catch(ExceptionTwo) is invoked when a matching ExceptionTwo is thrown. Catch(ExceptionOne)) is not invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionTwo('Waat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).toHaveBeenCalled()
    })
  })

  describe('.Finally().Done()', () => {
    test('Just runs when no error is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Results in an uncaught ExceptionOne when an ExceptionOne is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })
      const finallyBlock = jest.fn()

      expect(() => {
        Try(tryBlock)
          .Finally(finallyBlock)
          .Done()
      }).toThrow(ExceptionOne)

      expect(tryBlock).toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })
  })

  describe('.Catch(ExceptionOne)).Finally().Done()', () => {
    test('Just runs when no error is thrown. Finally is invoked', () => {
      const tryBlock = jest.fn()
      const catchBlock = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlock)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Results in an uncaught ExceptionTwo when a non-matching ExceptionTwo is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionTwo('Waat?')
      })
      const catchBlock = jest.fn()
      const finallyBlock = jest.fn()

      expect(() => {
        Try(tryBlock)
          .Catch(ExceptionOne, catchBlock)
          .Finally(finallyBlock)
          .Done()
      }).toThrow(ExceptionTwo)

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Catch(ExceptionOne)) is invoked when a matching ExceptionOne is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })
      const catchBlock = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlock)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })
  })

  describe('.Catch(ExceptionOne)).Catch(ExceptionTwo).Finally().Done()', () => {
    test('Just runs when no error is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn()
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Results in an uncaught ErrorThree when a  non-matching ErrorThree is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionThree('Waaat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      expect(() => {
        Try(tryBlock)
          .Catch(ExceptionOne, catchBlockOne)
          .Catch(ExceptionTwo, catchBlockTwo)
          .Finally(finallyBlock)
          .Done()
      }).toThrow(ExceptionThree)

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Catch(ExceptionOne)) is invoked when a matching ExceptionOne  is thrown. Catch(ExceptionTwo) is not invoked. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Catch(ExceptionTwo) is invoked when a matching ExceptionTwo is thrown. Catch(ExceptionOne)) is not invoked. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionTwo('Wat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })
  })

  describe('.Catch(ExceptionOne)).Catch(ExceptionTwo).Finally()', () => {
    test('Nothing happens because Done was not called.', () => {
      const tryBlock = jest.fn()
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Finally(finallyBlock)

      expect(tryBlock).not.toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
      expect(finallyBlock).not.toHaveBeenCalled()
    })
  })

  describe('.Catch(Exception).Catch(ExceptionOne)).Catch(ExceptionTwo).Finally().Done()', () => {
    test('Just runs when no error is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn()
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(ExceptionOne, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).not.toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Catch(Exception) is invoked when a matching subclass ExceptionOne is thrown. Catch(ExceptionTwo) is not invoked. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new ExceptionOne('Wat?')
      })
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(Exception, catchBlockOne)
        .Catch(ExceptionTwo, catchBlockTwo)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlockOne).toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })
  })

  describe('.Catch(AnotherError).Finally().Done()', () => {
    test('Catch(AnotherError) is invoked when a subclass of Error is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new AnotherError('Say whaaaaat?')
      })
      const catchBlock = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(AnotherError, catchBlock)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })

    test('Catch(Error) is invoked when a matching subclass AnotherError is thrown. Finally is invoked.', () => {
      const tryBlock = jest.fn(() => {
        throw new AnotherError('Say whaaaaat?')
      })
      const catchBlock = jest.fn()
      const finallyBlock = jest.fn()

      Try(tryBlock)
        .Catch(Error, catchBlock)
        .Finally(finallyBlock)
        .Done()

      expect(tryBlock).toHaveBeenCalled()
      expect(catchBlock).toHaveBeenCalled()
      expect(finallyBlock).toHaveBeenCalled()
    })
  })
})

describe('Handle()', () => {
  describe('Rethrow()', () => {
    test('Rethrows ExceptionTwo with no constructor arguments when ExceptionOne is handled.', () => {
      expect(() => {
        try {
          throw new ExceptionOne('Wat?')
        } catch (e) {
          Handle(e, {
            ExceptionOne: Rethrow(ExceptionTwo)
          })
        }
      }).toThrow(ExceptionTwo)
    })

    test('Rethrows ExceptionTwo with some constructor arguments when ExceptionOne is handled.', () => {
      expect(() => {
        try {
          throw new ExceptionOne('Wat?')
        } catch (e) {
          Handle(e, {
            ExceptionOne: Rethrow(ExceptionTwo, 'Wut?')
          })
        }
      }).toThrow(new ExceptionTwo('Wut?'))
    })
  })

  describe('ExceptionOne, ExceptionTwo', () => {
    test('Results in an uncaught ExceptionTwo when a non-matching ExceptionTwo is thrown.', () => {
      const catchBlockOne = jest.fn()

      expect(() => {
        try {
          throw new ExceptionTwo('Waat?')
        } catch (e) {
          Handle(e, {
            ExceptionOne: catchBlockOne,
          })
        }
      }).toThrow(ExceptionTwo)

      expect(catchBlockOne).not.toHaveBeenCalled()
    })

    test('Catches a matching ExceptionOne when it is thrown.', () => {
      const catchBlockOne = jest.fn()
      const catchBlockTwo = jest.fn()

      try {
        throw new ExceptionOne('Wat?')
      } catch (e) {
        Handle(e, {
          ExceptionOne: catchBlockOne,
          ExceptionTwo: catchBlockTwo,
        })
      }

      expect(catchBlockOne).toHaveBeenCalled()
      expect(catchBlockTwo).not.toHaveBeenCalled()
    })
  })

  describe('Error', () => {
    test('Catches a matching subclass of Error when AnotherError is thrown.', () => {
      const catchBlock = jest.fn()

      try {
        throw new AnotherError('Say whaaaaat?')
      } catch (e) {
        Handle(e, {
          Error: catchBlock,
        })
      }

      expect(catchBlock).toHaveBeenCalled()
    })
  })
})
