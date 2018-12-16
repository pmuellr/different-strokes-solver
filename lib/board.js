'use strict'

module.exports = {
  create
}

const chalk = require('chalk')

const points = require('./points')

// return a new board
function create (rows, cols, lines) {
  return new Board(rows, cols, lines)
}

// models the board
class Board {
  constructor (rows, cols) {
    this._rows = rows
    this._cols = cols
    this._points = points.create(rows, cols)
    this._printLines = getPrintLines(rows, cols)
  }

  get rows () { return this._rows }
  get cols () { return this._cols }
  get lines () { return this._lines }
  set lines (lines) { this._lines = lines.slice() }
  get points () { return this._points }

  // print the board
  print () {
    const printLines = JSON.parse(JSON.stringify(this._printLines))

    // draw the paths of the lines
    for (let line of this._lines) {
      let lastPoint = null
      for (let pathPoint of line.pathPoints) {
        drawSegment(printLines, lastPoint, pathPoint)
        lastPoint = pathPoint
      }
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

// draw a path segment from one point to it's neighbor
function drawSegment (printLines, startPoint, stopPoint) {
  if (startPoint == null) return

  if (startPoint.x === stopPoint.x) {
    drawSegmentV(printLines, startPoint, stopPoint)
  } else if (startPoint.y === stopPoint.y) {
    drawSegmentH(printLines, startPoint, stopPoint)
  } else {
    throw new Error(`invalid segment from ${startPoint} to ${stopPoint}`)
  }
}

function drawSegmentV (printLines, startPoint, stopPoint) {
  const bx = boardX(startPoint.x)
  const byStart = boardY(Math.min(startPoint.y, stopPoint.y))
  const byStop = boardY(Math.max(startPoint.y, stopPoint.y))

  for (let by = byStart; by <= byStop; by++) {
    printLines[by][bx] = coloredPath('*')
  }
}

function drawSegmentH (printLines, startPoint, stopPoint) {
  const by = boardY(startPoint.y)
  const bxStart = boardX(Math.min(startPoint.x, stopPoint.x))
  const bxStop = boardX(Math.max(startPoint.x, stopPoint.x))

  for (let bx = bxStart; bx <= bxStop; bx++) {
    printLines[by][bx] = coloredPath('*')
  }
}

function getPrintLines (rows, cols) {
  // we'll generate a 2-d array of the characters to print

  const edgeVert = coloredGrid('┼')
  const cellVert = coloredGrid('│')
  const edgeFill = coloredGrid('─')
  const cellFill = coloredGrid(' ')

  // generate "edge" and "cell" "lines", will be cloned to actual lines
  let edgeLine = []
  let cellLine = []
  for (let x = 1; x < cols; x++) {
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

  for (let y = 1; y < rows; y++) {
    printLines.push(edgeLine.slice())
    printLines.push(cellLine.slice())
  }
  printLines.push(edgeLine.slice())

  return printLines
}

// return colored start number
function coloredNumber (n) {
  return chalk.bgGreen.black(n.toString(36).toUpperCase())
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
