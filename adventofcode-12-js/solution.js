const fs = require('fs')

const mapRegex = /^(\d+)(?: <-> )((?:\d+, )*\d+)$/

const sets = []

function parseIndices (line) {
  const groups = mapRegex.exec(line)
  if (!groups) return

  return [parseInt(groups[1])].concat(groups[2].split(', ').map((x) => parseInt(x, 10)))
}

function getSet (ind) {
  return sets.find((set) => set.has(ind))
}

function addAllToSet (set, items) {
  items.forEach((item) => set.add(item))
}

function mergeSets (indices) {
  const matchingSets = sets.reduce((setPositions, set, setPosition) => {
    if (indices.some((ind) => set.has(ind))) {
      setPositions.push(setPosition)
    }
    return setPositions
  }, []).sort((a, b) => b - a)

  if (matchingSets.length === 0) {
    sets.push(new Set(indices))
    return
  }

  const firstSet = sets[matchingSets.slice(-1)[0]]
  addAllToSet(firstSet, indices)

  matchingSets.slice(0, -1).forEach((thisSetInd, counter) => {
    addAllToSet(firstSet, sets[thisSetInd])
    sets.splice(thisSetInd, 1)
  })
}

const input = fs.readFileSync('input.txt', 'utf8')
const lines = input.split('\n').filter((l) => l)

lines.forEach((line) => {
  const indices = parseIndices(line)
  if (!indices) return

  mergeSets(indices)
})

console.log('Number of sets', sets.length)
console.log(`Total count of indices in sets (should be ${lines.length})`, sets.reduce((memo, set) => memo + set.size, 0))
console.log('Size of set with 0 in it', getSet(0).size)
