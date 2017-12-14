fun main(args: Array<String>) {
  var BadLength = Throwable("Length is larger than list size")

  fn reverseSublist(list: IntArray, start: Int, length: Int) {
    if (length > list.size) {
      throw BadLength
    }
    if (start >= list.size) {
      throw BadLength
    }
  }

  // var lengths: IntArray = intArrayOf(18,1,0,161,255,137,254,252,14,95,165,33,181,168,2,188)
  var lengths: IntArray = intArrayOf(3, 4, 1, 5)
  // var list: IntArray = Array(256, { i -> i })
  var list: IntArray = Array(5, { i -> i })
  var skipSize: Int = 0
  var position: Int = 0

  println("Hello, World!")
}

