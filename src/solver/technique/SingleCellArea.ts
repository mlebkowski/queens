import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";

export default class SingleCellArea implements Technique {
  deduct(areas: AreaCollection): Deduction[] {
    return areas.unsolved
      .filter((area) => area.empty.length === 1)
      .flatMap((area) => area.empty)
      .map(
        (point) =>
          new Deduction(
            "Area has only one empty spot",
            areas.concludeThat.queenAt(point.point),
          ),
      );
  }
}
