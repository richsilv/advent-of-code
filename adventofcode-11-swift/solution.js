const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')
const directions = input.split(',')

const scores = directions.reduce((memo, direction) => {
  switch (direction) {
    case 'n':
      memo.n += 1
      break
    case 's':
      memo.n -= 1
      break
    case 'ne':
      memo.ne += 1
      break
    case 'sw':
      memo.ne -= 1
      break
    case 'nw':
      memo.nw += 1
      break
    case 'se':
      memo.nw -= 1
      break
    default:
      console.log(`Cannot recognise ${direction}`)
  }
  return memo
}, {
  n: 0,
  nw: 0,
  ne: 0
})

console.log(scores)
