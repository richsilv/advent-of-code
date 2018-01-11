import re

input_file = open("input.txt")
input_lines = input_file.readlines()

converter = re.compile('(\d+): (\d+)')
def add_scanner(line):
  parsed = converter.match(line)
  if parsed == None:
    return None
  return {
    "depth": int(parsed.group(1)),
    "range": int(parsed.group(2)),
  }

scanners = [this_scanner for this_scanner in [add_scanner(line) for line in input_lines] if this_scanner != None]

def caught(delay):
  return next((True for this_scanner in scanners if caught_by_scanner(this_scanner, delay)), False)

def caught_by_scanner(scanner, delay):
  return (delay + scanner["depth"]) % ((scanner["range"] - 1) * 2) == 0

my_delay = 0
while caught(my_delay):
  my_delay += 1

print(my_delay)
