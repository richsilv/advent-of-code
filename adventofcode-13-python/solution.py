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
    "position": 0,
    "direction": 1,
  }

def find_max_depth(scanners):
  return scanners[-1]["depth"]

def move_scanners(scanners):
  for scanner in scanners:
    scanner["position"] = scanner["position"] + scanner["direction"]
    if scanner["position"] == 0 or scanner["position"] == scanner["range"] - 1:
      scanner["direction"] = -scanner["direction"]

def check_severity(scanners, depth_position):
  scanner = next((this_scanner for this_scanner in scanners if this_scanner["depth"] == depth_position), None)
  if scanner == None:
    return 0
  elif scanner["position"] == 0:
    return scanner["depth"] * scanner["range"]
  else:
    return 0

def check_if_caught(scanners, depth_position):
  scanner = next((this_scanner for this_scanner in scanners if this_scanner["depth"] == depth_position), None)
  if scanner == None:
    return False
  elif scanner["position"] == 0:
    return True
  else:
    return False

def reset_scanners(scanners):
  for scanner in scanners:
    scanner["position"] = 0
    scanner["direction"] = 1

def calc_if_caught_after_delay(scanners, delay):
  max_depth = find_max_depth(scanners)
  reset_scanners(scanners)
  for i in range(delay):
    move_scanners(scanners)

  depth_position = 0
  caught = False
  while depth_position <= max_depth and caught == False:
    caught = check_if_caught(scanners, depth_position)
    move_scanners(scanners)
    depth_position += 1
  return caught

my_scanners = [scanner for scanner in [add_scanner(line) for line in input_lines] if scanner != None]

my_delay = 0
while calc_if_caught_after_delay(my_scanners, my_delay):
  my_delay += 1

print(my_delay)
print(my_scanners)
