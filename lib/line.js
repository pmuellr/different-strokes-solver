'use strict'

module.exports = {
  create
}

// return a new Line object
function create (x, y, length) {
  return new Line(x, y, length)
}

// models a line
class Line {
  constructor (x, y, length) {
    this._x = x
    this._y = y
    this._length = length
    this._path = []
  }

  get x () { return this._x }
  get y () { return this._y }
  get length () { return this._length }
  get path () { return this._path.slice() }
}
