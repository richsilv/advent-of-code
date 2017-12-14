let register = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6]
const registerLength = register.length
let cycleStore = []
let count = 0

function redistribute () {
  const { max, ind } = maxIndex(register)
  register[ind] = 0
  for (let i = 1; i <= max; i++) {
    register[(ind + i) % registerLength] += 1
  }
}

function maxIndex () {
  return register.reduce((memo, val, ind) => {
    if (val > memo.max) {
      return { max: val, ind }
    }
    return memo
  }, { max: 0, ind: null })
}

function matchLists (listA, listB) {
  return !listA.some((entry, ind) => entry !== listB[ind])
}

function runCycle () {
  if (count % 100 === 0) console.log(`Tested ${count} cycles`)

  if (cycleStore.some((cycle) => matchLists(cycle, register))) {
    console.log(`Found a repeat after ${count} cycles`)
  } else {
    cycleStore.push([...register])
    count += 1
    redistribute()
    process.nextTick(runCycle)
  }
}

runCycle()
