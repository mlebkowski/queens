import CellFactory from "@/solver/CellFactory";
import AreaCollection from "@/solver/AreaCollection";
import Solver from "@/solver/Solver";
import Cell from "@/solver/Cell";
import TechniquesFactory from "@/solver/technique/TechniquesFactory";
import AreaCollectionBuilder from "@/solver/AreaCollectionBuilder";

export default class SolverFactory {
  static fromCells(colors: Color[], width: number) {
    if (colors.length !== width * width) {
      throw new Error("Expected a square");
    }

    const areas = CellFactory.fromColorList(colors, width).reduce(
      (builder: AreaCollectionBuilder, cell: Cell) => builder.add(cell),
      new AreaCollectionBuilder(),
    );

    return new Solver(areas.build(), [...TechniquesFactory.make()]);
  }
}
