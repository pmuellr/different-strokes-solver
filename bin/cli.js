#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

const solver = require('../lib/solver')

// run main if this is the main module launched
if (require.main === module) setImmediate(main)

// main program
function main () {
  const args = process.argv.slice(2)
  const { size, starts } = parseArgs(args)

  try {
    solver.solve({ size, starts })
  } catch (err) {
    errorExit(err.message)
  }
}

// parse arguments
function parseArgs (args) {
  if (args.length === 0) help()

  let arg = args.shift()

  const size = getSize(arg)
  if (size == null) errorExit(`invalid size argument "${arg}"`)

  const starts = []
  for (arg of args) {
    const start = getStart(arg)
    if (start == null) errorExit(`invalid line start argument "${arg}"`)

    starts.push(start)
  }

  if (starts.length === 0) errorExit(`no line start arguments provided`)

  return { size, starts }
}

function errorExit (message) {
  console.log(`${message} - run this program with no arguments for help`)
  process.exit(1)
}

// get the size of the puzzle in { cols: number, rows: number }
function getSize (string) {
  if (string == null) return null
  string = string.trim()

  const match = string.match(/^(\d*),(\d*)$/)
  if (match == null) return null

  const cols = parseNumber(match[1])
  const rows = parseNumber(match[2])

  if (cols == null || rows == null) return null
  return { cols, rows }
}

// get a starting position as { x: number, y: number, length: number }
function getStart (string) {
  if (string == null) return null
  string = string.trim()

  const match = string.match(/^(\d*),(\d*),(\d*)$/)
  if (match == null) return null

  const x = parseNumber(match[1])
  const y = parseNumber(match[2])
  const length = parseNumber(match[3])

  if (x == null || y == null || length == null) return null
  return { x, y, length }
}

// parse a string into a number
function parseNumber (string) {
  string = string.trim()
  const number = parseInt(string, 10)

  if (isNaN(number)) return null

  return number
}

function help () {
  const readmeName = path.join(__dirname, '..', 'README.md')
  const readme = fs.readFileSync(readmeName, 'utf8')
  console.log(readme)
  process.exit(1)
}
