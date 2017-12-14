import Foundation

let path = "./input.txt"

let fileHandle = FileHandle.init(forReadingAtPath: path)
if fileHandle == nil {
  print("Cannot find file")
}

let data = fileHandle!.readDataToEndOfFile()
let dataNsString = NSString(data: data, encoding: String.Encoding.utf8.rawValue)
let dataString = String.init(describing: dataNsString)
let strings = dataString.split(separator: Character.init("\n"))
print(strings.count)



func parse(line: String) -> String {
  let regex = NSRegularExpression(pattern: "([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+, )*[a-z]+))?")
  let results = regex.matches(in: line, range: NSRange(line.startIndex..., in: line))
  return greeting
}

