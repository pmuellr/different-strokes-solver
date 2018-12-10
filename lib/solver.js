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
  const startingBoard = Board.create(rows, cols)

  // create lines, sort by length
  const lines = starts.map(function ({x, y, length}) {
    return Line.create(startingBoard, x, y, length)
  })
  lines.sort((lineA, lineB) => lineB.length - lineA.length)

  startingBoard.lines = lines

  // print it
  utils.printSection('starting board')
  startingBoard.print()

  // solve it
  const timerSolved = utils.timer()
  let solvedBoard = solveBoard(startingBoard, lines)

  // print it
  const elapsed = timerSolved() / 1000
  utils.printSection(`final answer ... (${elapsed} seconds)`)

  if (solvedBoard == null) {
    console.log('no solution!')
  } else {
    solvedBoard.print()
  }
}

// solve the current board state with the remaining lines
function solveBoard (board, lines) {
  // successful exit criteria!
  if (lines.length === 0) return board

  // get the next line
  const line = lines[0]

  // if it's long enough, solve with remaining lines
  if (line.isLongEnough) {
    // check unique segments lengths, if not, line still not solved
    if (!line.hasUniqueSegmentLengths()) return null

    lines = lines.slice()
    lines.shift()
    return solveBoard(board, lines)
  }

  // otherwise not long enough, so try some moves
  for (let move of line.allMoves) {
    if (!line.isValidMove(move)) continue

    // if the move was valid, push it and keep solving
    line.pushMove(move)
    // board.print()
    const solvedBoard = solveBoard(board, lines)

    // if solved, return!
    if (solvedBoard != null) return solvedBoard

    // otherwise, pop the move and continue on
    line.popMove(move)
  }

  // none of the moves worked!
  return null
}

// validate input, throwing error if something is wrong
function validate ({ rows, cols, starts }) {
  if (rows <= 0) throw new ValidationError(`rows must be > 0, was ${rows}`)
  if (cols <= 0) throw new ValidationError(`columns must be > 0, was ${cols}`)

  // make sure x, y, length are in permitted bounds
  for (let {x, y, length} of starts) {
    if (x <= 0) throw new ValidationError(`line start x must be > 0, was ${x}`)
    if (y <= 0) throw new ValidationError(`line start y must be > 0, was ${y}`)

    if (x > cols) throw new ValidationError(`line start x must be <= ${cols}, was ${x}`)
    if (y > rows) throw new ValidationError(`line start y must be <= ${rows}, was ${y}`)

    if (length <= 0) throw new ValidationError(`line length must be > 0, was ${length}`)
    if (length >= 16) throw new ValidationError(`line length must be < 16, was ${length}`)
  }

  // make sure no starts are at the same point
  const startSet = new Set()
  for (let {x, y} of starts) {
    const start = `${x},${y}`
    if (startSet.has(start)) {
      throw new ValidationError(`starting point for line already used: ${x},${y}`)
    }
    startSet.add(start)
  }
}

// log a message - uncomment / comment to enable / disable
function debugLog (message) {
  if (!utils.DEBUG) return
  console.log(message)
}

class ValidationError extends Error {
  get isValidationError () {
    return true
  }
}
