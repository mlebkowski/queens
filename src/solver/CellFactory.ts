import Cell from "@/solver/Cell";
import State from "@/solver/State";

export default class CellFactory {
  static fromColorList(colors: Color[], width: number): Cell[] {
    return colors.map((color, index) => ({
      color,
      value: State.Empty,
      point: { x: index % width, y: Math.floor(index / width) },
    }));
  }
}
