fun main(args: Array<String>) {
  var BadLength = Throwable("Length is larger than list size")

  fun reverseSubArray(array: IntArray, position: Int, length: Int): IntArray {
    var arraySize = array.size
    if (length > arraySize) {
      throw BadLength
    }
    if (position >= arraySize) {
      throw BadLength
    }

    var nextIndices: IntArray = IntArray(arraySize, { i -> i })
    var newArray = array.copyOf()
    for (i in Array(length, { i -> i})) {
      nextIndices[(i + position) % arraySize] = (position + length - i - 1) % arraySize
    }
    for (i in array.indices) {
      newArray[i] = array[nextIndices[i]]
    }
    return newArray
  }

  fun combineBlock(list: List<Int>): Int {
    return list.reduce({ acc, int -> acc.xor(int) })
  }

  fun padHex(str: String): String {
    if (str.length == 2) {
      return str
    }
    return "0" + str
  }

  // var lengths: IntArray = intArrayOf(3, 4, 1, 5)
  var numLengths: String = "18,1,0,161,255,137,254,252,14,95,165,33,181,168,2,188"
  var lengths = numLengths.map({ char -> char.toByte().toInt() }).plus(listOf(17, 31, 73, 47, 23))

  var state: IntArray = IntArray(256, { i -> i })
  // var state: IntArray = IntArray(5, { i -> i })
  var stateSize = state.size
  var skipSize: Int = 0
  var position: Int = 0

  fun runRound() {
    for (length in lengths) {
      state = reverseSubArray(state, position, length)
      position = (position + length + skipSize) % stateSize
      skipSize += 1
    }
  }

  for (i in Array(64, { _ -> 0 })) {
    runRound()
  }

  var slices = Array(16, { i -> i * 16 }).map({ startInt -> state.slice(IntRange(startInt, startInt + 15)) })
  var denseHash = slices.map({ slice -> padHex(combineBlock(slice).toString(16)) }).joinToString("")

  println(denseHash)
}

