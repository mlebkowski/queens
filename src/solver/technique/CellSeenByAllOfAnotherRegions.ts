import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";
import Conclusion from "@/solver/technique/Conclusion";
import Area from "@/solver/Area";
import PointValue from "@/solver/PointValue";
import pointRulesOutArbiter from "@/solver/arbiter/PointRulesOutArbiter";
import AreaPoint from "@/solver/AreaPoint";

export default class CellSeenByAllOfAnotherRegions implements Technique {
  deduct(areas: AreaCollection): Deduction[] {
    const rulesOut =
      (point: Point) =>
      ({ point: some }: AreaPoint) =>
        pointRulesOutArbiter(point, some);

    return areas.unsolved
      .flatMap((area) => area.empty)
      .filter(({ point }) =>
        areas.unsolved.some((area) => area.empty.every(rulesOut(point))),
      )
      .map(
        ({ point }) =>
          new Deduction(
            `This cell is seen by each candidate in another region`,
            areas.concludeThat.pointRuledOut(point),
          ),
      );
  }
}
