'use strict'

module.exports = {
  solve
}

const utils = require('./utils')
const Board = require('./board')
const Line = require('./line')

debugLog('debug logging enabled')

// solve the puzzle given initial state
function solve ({ size, starts }) {
  const { rows, cols } = size

  // validate the args
  validate({ rows, cols, starts })

  // create the initial board
  const lines = starts.map(function ({x, y, length}) {
    return Line.create(x, y, length)
  })

  const startingBoard = Board.create(rows, cols, lines)

  // print it
  utils.printSection('starting board')
  startingBoard.print()

  // solve it
  const timerSolved = utils.timer()
  let solvedBoard

  // print it
  const elapsed = timerSolved() / 1000
  utils.printSection(`final answer ... (${elapsed} seconds)`)

  if (solvedBoard == null) {
    console.log('no solution!')
  } else {
    solvedBoard.print()
  }
}

// validate input, throwing error if something is wrong
function validate ({ rows, cols, starts }) {
  if (rows <= 0) throw new Error(`rows must be > 0, was ${rows}`)
  if (cols <= 0) throw new Error(`columns must be > 0, was ${cols}`)

  // make sure x, y, length are in permitted bounds
  for (let {x, y, length} of starts) {
    if (x <= 0) throw new Error(`line start x must be > 0, was ${x}`)
    if (y <= 0) throw new Error(`line start y must be > 0, was ${y}`)

    if (x > cols) throw new Error(`line start x must be <= ${cols}, was ${x}`)
    if (y > rows) throw new Error(`line start y must be <= ${rows}, was ${y}`)

    if (length <= 0) throw new Error(`line length must be > 0, was ${length}`)
    if (length >= 16) throw new Error(`line length must be < 16, was ${length}`)
  }

  // make sure no starts are at the same point
  const startSet = new Set()
  for (let {x, y} of starts) {
    const start = `${x},${y}`
    if (startSet.has(start)) {
      throw new Error(`starting point for line already used: ${x},${y}`)
    }
    startSet.add(start)
  }
}

// log a message - uncomment / comment to enable / disable
function debugLog (message) {
  if (!utils.DEBUG) return
  console.log(message)
}
