import State from "@/solver/State";

export default interface Cell {
  point: Point;
  value: State;
  color: Color;
}
