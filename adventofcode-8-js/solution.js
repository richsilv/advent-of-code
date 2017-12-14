const fs = require('fs')

function readLines (filename) {
  const lines = fs.readFileSync(filename, 'utf8')
  return lines.split('\n')
}

const parseRegex = /^([a-z]+) (inc|dec) (-?[0-9]+) if ([a-z]+) (<|>|<=|>=|==|!=) (-?[0-9]+)$/
const functionMap = {
  '>': (x, y) => {
    return x > y
  },
  '>=': (x, y) => {
    return x >= y
  },
  '<': (x, y) => {
    return x < y
  },
  '<=': (x, y) => {
    return x <= y
  },
  '==': (x, y) => {
    return x === y
  },
  '!=': (x, y) => {
    return x !== y
  },
  inc: (x, y) => {
    return x + y
  },
  dec: (x, y) => {
    return x - y
  }
}

function Registers () {
  let data = {}

  const register = {
    get (key) {
      if (key in data) {
        return data[key]
      }
      data[key] = 0
      return 0
    },

    set (key, val) {
      data[key] = val
    },

    compare (reg, comparatorString, val) {
      const comparator = functionMap[comparatorString]
      if (!comparator) throw new Error(`Cannot find comparator ${comparatorString}`)

      const parsedVal = typeof val === 'number' ? val : parseInt(val, 10)

      return comparator(this.get(reg), parsedVal)
    },

    update (modifier, register, amount) {
      const currentVal = this.get(register)
      this.set(register, modifier(currentVal, amount))
    },

    maxVal () {
      return Object.keys(data).reduce(({ register, val }, thisRegister) => {
        const thisVal = data[thisRegister]
        if (thisVal > val) {
          return { register: thisRegister, val: thisVal }
        }
        return { register, val }
      }, { register: null, val: 0 })
    }
  }

  return register
}
const registers = Registers()

const instructions = readLines('input.txt')
const maxEver = instructions.reduce(({ register, maxVal }, instruction) => {
  if (!instruction) return { register, maxVal }
  const parsedInstruction = parseRegex.exec(instruction)
  if (!parsedInstruction) console.log(instruction)
  if (!registers.compare(parsedInstruction[4], parsedInstruction[5], parsedInstruction[6])) return { register, maxVal }

  const modifier = functionMap[parsedInstruction[2]]
  if (!modifier) throw new Error(`Cannot find modifier ${parsedInstruction[2]}`)

  registers.update(modifier, parsedInstruction[1], parseInt(parsedInstruction[3]))

  const { register: thisRegister, val: thisMaxVal } = registers.maxVal()
  if (thisMaxVal > maxVal) {
    return { register: thisRegister, maxVal: thisMaxVal }
  }
  return { register, maxVal }
}, { register: null, maxVal: 0 })

console.log(registers.maxVal())
console.log(maxEver)
