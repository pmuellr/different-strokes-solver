'use strict'
module.exports = {
  create
}

// return a new Points object
function create (rows, cols) {
  return new Points(rows, cols)
}

// model a collection of all our points
class Points {
  constructor (rows, cols) {
    this._rows = rows
    this._cols = cols
    this._points = []

    // initialize the 2-d array of points
    for (let row = 1; row <= rows; row++) {
      const rowElements = []
      this._points.push(rowElements)
      for (let col = 1; col <= cols; col++) {
        rowElements.push(new Point(this, col, row))
      }
    }
  }

  // x and y will come in as 1..(rows|cols)
  getPoint (x, y) {
    if (x < 1 || x > this._cols) return null
    if (y < 1 || y > this._rows) return null

    return this._points[y - 1][x - 1]
  }
}

// model a single point
class Point {
  constructor (points, x, y) {
    this._points = points
    this._x = x
    this._y = y
    this._occupied = false
  }

  get x () { return this._x }
  get y () { return this._y }
  get occupied () { return this._occupied }
  set occupied (val) { this._occupied = !!val }

  toString () {
    return `Point[x: ${this.x}, y: ${this.y}, occupied: ${this.occupied}]`
  }

  // return the point relative to this point, after making move
  pointAfterMove (move) {
    let deltaX = 0
    let deltaY = 0

    switch (move) {
      case 0: deltaY = -1; break
      case 1: deltaX = 1; break
      case 2: deltaY = 1; break
      case 3: deltaX = -1; break
      default: throw new Error(`invalid move! ${move}`)
    }

    return this._points.getPoint(this._x + deltaX, this._y + deltaY)
  }

  // return the point relative to this point, before making move
  pointBeforeMove (move) {
    let deltaX = 0
    let deltaY = 0

    switch (move) {
      case 0: deltaY = 1; break
      case 1: deltaX = -1; break
      case 2: deltaY = -1; break
      case 3: deltaX = 1; break
      default: throw new Error(`invalid move! ${move}`)
    }

    return this._points.getPoint(this._x + deltaX, this._y + deltaY)
  }
}
