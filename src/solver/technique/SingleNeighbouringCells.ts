import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";
import AreaPoint from "@/solver/AreaPoint";

export default class SingleNeighbouringCells implements Technique {
  deduct(areas: AreaCollection): Deduction[] {
    const areOrthogonal = ([{ point: alpha }, { point: bravo }]: AreaPoint[]) =>
      alpha.y === bravo.y && 1 === Math.abs(alpha.x - bravo.x);

    return areas.unsolved
      .filter((area) => area.empty.length === 2)
      .filter((area) => areOrthogonal(area.empty))
      .map(
        (area) =>
          new Deduction(
            `Only two spots left in this area, this excludes all neighbouring positions`,
            areas.concludeThat.sandwichRuledOut(area.empty),
          ),
      );
  }
}
