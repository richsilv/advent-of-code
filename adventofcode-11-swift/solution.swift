import Foundation

let path = "./input.txt"

let fileHandle = FileHandle.init(forReadingAtPath: path)
if fileHandle == nil {
  print("Cannot find file")
}

let data = fileHandle!.readDataToEndOfFile()
let dataNsString = NSString(data: data, encoding: String.Encoding.utf8.rawValue)
let dataString = String.init(describing: dataNsString!)
let trimmed = dataString.replacingOccurrences(of: "\n", with: "")
let instructions = trimmed.split(separator: Character.init(","))

var nw = 0
var n = 0
var ne = 0

var maxDisplacement = 0

func getDisplacement(nw: Int, n: Int, ne: Int) -> Int {
  let xDisplacement = ne - nw
  let yDisplacement = (2 * n) + nw + ne

  let xAbs = abs(xDisplacement)
  let yAbs = abs(yDisplacement)

  let total = yAbs > xAbs
    ? xAbs + (yAbs - xAbs) / 2
    : xAbs + (xAbs - yAbs) / 2

  return total
}

for instruction in instructions {
  switch instruction {
    case "n":
      n += 1
    case "s":
      n -= 1
    case "ne":
      ne += 1
    case "sw":
      ne -= 1
    case "nw":
      nw += 1
    case "se":
      nw -= 1
    default:
      print("cannot recognise", instruction)
      break
  }

  let thisDisplacement = getDisplacement(nw: nw, n: n, ne: ne)
  if thisDisplacement > maxDisplacement {
    maxDisplacement = thisDisplacement
  }
}

print("Total moves required", getDisplacement(nw: nw, n: n, ne: ne))
print("Max displacement", maxDisplacement)
