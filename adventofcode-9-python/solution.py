import re
import string

input_file = open("input.txt")
text_input = input_file.read()

state = []
index = 0
max_index = 0
score = 0
garbage_chars = 0
position = 0

while position < len(text_input):
  next_element = text_input[position]
  if len(state) > 0 and state[0] == "GARBAGE":
    if next_element == "!":
      position += 1
    elif next_element == ">":
      state = state[1:]
    else:
      garbage_chars = garbage_chars + 1
  else:
    if next_element == "{":
      index += 1
      score += index
      if index > max_index:
        max_index = index
      state = ["STREAM"] + state
    elif next_element == "<":
      state = ["GARBAGE"] + state

  if len(state) > 0 and state[0] == "STREAM":
    if next_element == "}":
      index -= 1
      state = state[1:]

  position += 1

if index > 0:
  print("Final index is " + str(index) + "!!!")

print("Score: " + str(score))
print("Garbage character: " + str(garbage_chars))
