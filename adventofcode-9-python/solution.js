const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')
let state = []
let index = 0
let maxIndex = 0
let score = 0
let garbageChars = 0

for (let i = 0; i < input.length; i++) {
  const nextElement = input[i]
  if (state[0] === 'GARBAGE') {
    if (nextElement === '!') {
      i++
    } else if (nextElement === '>') {
      state.shift()
    } else {
      garbageChars++
    }
  } else {
    if (nextElement === '{') {
      index += 1
      score += index
      if (index > maxIndex) maxIndex = index
      state.unshift('STREAM')
    } else if (nextElement === '<') {
      state.unshift('GARBAGE')
    }
  }

  if (state[0] === 'STREAM') {
    if (nextElement === '}') {
      index -= 1
      state.shift()
    }
  }
}
if (index > 0) {
  console.error(`Final index is ${index}!!!`)
}

console.log(`Score: ${score}`)
console.log(`Garbage character: ${garbageChars}`)
