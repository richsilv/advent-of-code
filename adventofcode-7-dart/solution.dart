import 'dart:async';
import 'dart:io';

List<Program> programs;

class Program {
  String name;
  num weight;
  List<String> children;
  List<num> childWeights = [];

  Program(this.name, this.weight, this.children);

  num getWeight() {
    if (children.isEmpty) {
      return weight;
    } else {
      List<Program> childPrograms = children.map((childName) => getProgram(childName)).toList();
      List<num> childWeights = childPrograms.map((childProgram) => childProgram.getWeight()).toList();
      if (childWeights.any((childWeight) => childWeight != childWeights[0])) {
        print("Unbalanced: " + name);
        print("Child weights are:");
        var childInds = new List<int>.generate(childPrograms.length, (i) => i);
        childInds.forEach((ind) {
          print("Program " + childPrograms[ind].name +
            " has total weight " + childWeights[ind].toString() +
            " and personal weight " + childPrograms[ind].weight.toString()
          );
        });
      }
      return weight + childWeights.reduce((val, el) => val + el);
    }
  }
}

Program getProgram(String name) => programs.firstWhere((program) => program.name == name);

Program getParent(Program thisProgram) => programs.firstWhere((program) {
  return program.children.any((childProgram) => childProgram == thisProgram.name);
});

RegExp exp = new RegExp(r"([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+, )*[a-z]+))?");


Future main() async {
  File file = new File('input.txt');
  Iterable<String> contents = await file.readAsLines();

  programs = contents.map((line) {
    Iterable<Match> matches = exp.allMatches(line);
    List<String> lineData = matches.elementAt(0).groups([1, 2, 3]);
    List<String> childNames = lineData[2] != null ? lineData[2].split(', ') : [];
    return new Program(lineData[0], int.parse(lineData[1]), childNames);
  });

  Program parent = programs.firstWhere((program) {
    return programs.every((thisProgram) {
      return !thisProgram.children.any((child) => child == program.name);
    });
  });

  print("The parent is " + parent.name);

  num totalWeight = parent.getWeight();

  print("Total weight");
  print(totalWeight);
}
