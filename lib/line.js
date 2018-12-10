'use strict'

module.exports = {
  create
}

// return a new Line object
function create (board, x, y, length) {
  return new Line(board, x, y, length)
}

// models a line
class Line {
  constructor (board, x, y, length) {
    this._board = board
    this._x = x
    this._y = y
    this._len = length // required length
    this._currPoint = board.points.getPoint(x, y)
    this._path = []
    this._moves = []

    this._currPoint.occupied = true
  }

  // starting position
  get x () { return this._x }
  get y () { return this._y }

  // current end point of the line
  get currentPoint () { return this._currPoint }

  // required length
  get length () { return this._len }

  // current length during solve processing
  get currentLength () { return this._moves.length }

  // the moves so far [0,1,2,3] => [N/E/S/W] - direction move]
  get moves () { return this._moves.slice() }

  // get the ponts in the path so far
  get pathPoints () {
    let result = []

    let point = this._board.points.getPoint(this._x, this._y)
    result.push(point)
    for (let move of this._moves) {
      point = point.pointAfterMove(move)
      result.push(point)
    }

    return result
  }

  // return whether the line is long enough given moves so far
  get isLongEnough () {
    return this.currentLength === this.length
  }

  // return the moves possible (without determining validity)
  get allMoves () {
    return [0, 1, 2, 3].slice()
  }

  // return whether a move is valid
  isValidMove (move) {
    const newPoint = this.currentPoint.pointAfterMove(move)
    if (newPoint == null) return false

    return !newPoint.occupied
  }

  // push a new move to update the moves/paths
  pushMove (move) {
    // const origPoint = this._currPoint
    this._moves.push(move)
    this._currPoint = this._currPoint.pointAfterMove(move)
    this._currPoint.occupied = true
    // console.log(`push move from ${origPoint} to ${this._currPoint}`)
  }

  // pop the previously pushed move
  popMove () {
    // const origPoint = this._currPoint
    this._currPoint.occupied = false
    const move = this._moves.pop()
    this._currPoint = this._currPoint.pointBeforeMove(move)
    // console.log(`pop  move from ${origPoint} to ${this._currPoint}`)
  }

  // check whether the segments of the line all have unique lengths
  hasUniqueSegmentLengths () {
    const segmentLengths = this.getSegmentLengths()
    const segmentLengthsSet = new Set(segmentLengths)

    return segmentLengths.length === segmentLengthsSet.size
  }

  // get the sength of all the segments of the line, where segment is
  // a contiguos straight line
  getSegmentLengths () {
    // this._board.print()
    // console.log(`line.getSegmentLengths(): this.moves`, this.moves.join(' '))
    const segmentLengths = []

    let lastMove = -1
    let segmentLength = 0
    for (let move of this.moves) {
      if (move !== lastMove && lastMove !== -1) {
        segmentLengths.push(segmentLength)
        segmentLength = 1
      } else {
        segmentLength++
      }

      lastMove = move
    }

    segmentLengths.push(segmentLength)

    // console.log(`line.getSegmentLengths(): segmentLengths`, segmentLengths.join(' '))
    return segmentLengths
  }
}
