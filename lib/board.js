'use strict'

module.exports = {
  create
}

const chalk = require('chalk')

// return a new board
function create (rows, cols, lines) {
  return new Board(rows, cols, lines)
}

// models the board
class Board {
  constructor (rows, cols, lines) {
    this._rows = rows
    this._cols = cols
    this._lines = lines
  }

  get rows () { return this._rows }
  get cols () { return this._cols }
  get lines () { return this._lines }

  // print the board
  print () {
    // we'll generate a 2-d array of the characters to print

    const edgeVert = coloredGrid('┼')
    const cellVert = coloredGrid('│')
    const edgeFill = coloredGrid('─')
    const cellFill = coloredGrid(' ')

    // generate "edge" and "cell" "lines", will be cloned to actual lines
    let edgeLine = []
    let cellLine = []
    for (let x = 1; x < this._cols; x++) {
      edgeLine.push(edgeVert)
      cellLine.push(cellVert)

      for (let i = 0; i < 3; i++) {
        edgeLine.push(edgeFill)
        cellLine.push(cellFill)
      }
    }
    edgeLine.push(edgeVert)
    cellLine.push(cellVert)

    // generate the 2-d lines array of the empty board
    const printLines = []
    for (let y = 1; y < this._rows; y++) {
      printLines.push(edgeLine.slice())
      printLines.push(cellLine.slice())
    }
    printLines.push(edgeLine.slice())

    // draw the lines
    const pathPoints = []
    for (let {x, y} of pathPoints) {
      printLines[boardY(y)][boardX(x)] = coloredPath('*')
    }

    // place the numbers
    for (let { x, y, length } of this.lines) {
      printLines[boardY(y)][boardX(x)] = coloredNumber(length)
    }

    // print
    console.log('')
    printLines.forEach(printLine => console.log(printLine.join('')))
  }
}

// return colored start number
function coloredNumber (n) {
  return chalk.bgGreen.black(n.toString(16).toUpperCase())
}

// return colored grid character
function coloredGrid (c) {
  return chalk.bgWhite.black(c)
}

// return colored path character
function coloredPath (c) {
  return chalk.bgGreen.green(c)
}

// return the board's "x" given a real "x" (see below)
function boardX (x) { return (x - 1) * 4 }

// return the board's "y" given a real "y" (see below)
function boardY (y) { return (y - 1) * 2 }

/*
indices:

    01234567890123456
  0 ┼───┼───┼───┼───┼ 1
  1 │   │   │   │   │
  2 ┼───┼───┼───┼───┼ 2
  3 │   │   │   │   │
  4 ┼───┼───┼───┼───┼ 3
  5 │   │   │   │   │
  6 ┼───┼───┼───┼───┼ 4
  7 │   │   │   │   │
  8 ┼───┼───┼───┼───┼ 5
    1   2   3   4   5
*/
