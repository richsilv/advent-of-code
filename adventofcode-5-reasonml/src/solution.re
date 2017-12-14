let position = ref(0);
let data = Input.data;
let maxIndex = Array.length(data);
let jumps = ref(0);

while (position^ >= 0 && position^ < maxIndex) {
  let jumpSize = Array.get(data, position^);
  let newPosition = position^ + jumpSize;
  data[position^] = data[position^] + (jumpSize >= 3 ? -1 : 1);
  position := newPosition;
  jumps := jumps^ + 1;
};

Js.log("Number of jumps: " ++ string_of_int(jumps^));
