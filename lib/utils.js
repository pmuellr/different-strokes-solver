'use strict'

module.exports = {
  DEBUG: process.env.DEBUG != null,
  timer,
  leftPad,
  rightPad,
  printSection,
  createIterator
}

// create a timer; returns function, which when called, returns elapsed ms
function timer () {
  const start = Date.now()

  return function stopTimer () {
    return Date.now() - start
  }
}

// uh huh
function leftPad (s, length, pad = ' ') {
  s = `${s}`
  while (s.length < length) s = `${pad}${s}`
  return s
}

// yup
function rightPad (s, length, pad = ' ') {
  s = `${s}`
  while (s.length < length) s = `${s}${pad}`
  return s
}

function printSection (label) {
  console.log('')
  // console.log('---------------------------------------------------------------')
  console.log(label)
  // console.log('---------------------------------------------------------------')
}

// create an iterator given an init and next function
function createIterator (state, nextFn) {
  class CreatedIterator {
    constructor () {
      this.state = state
    }

    [Symbol.iterator] () {
      return this
    }

    next () {
      const doneSignal = {}
      const item = nextFn(this.state, doneSignal)

      if (item === doneSignal) return { done: true }

      return {
        done: false,
        value: item
      }
    }
  }

  return new CreatedIterator()
}
