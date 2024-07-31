import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";

export default class OnlySingleRegionInRow implements Technique {
  deduct(areas: AreaCollection): Deduction[] {
    const { rows } = areas;
    return rows
      .map(({ row, points }) => ({
        row,
        distinctAreas: [
          ...new Set(
            points
              .filter(({ isRuledOut }) => !isRuledOut)
              .map((point) => point.area.id),
          ),
        ],
      }))
      .filter(({ distinctAreas }) => distinctAreas.length === 1)
      .flatMap(({ row, distinctAreas }) =>
        distinctAreas.map((areaId) => ({ areaId, row })),
      )
      .map(({ areaId, row }) => {
        return new Deduction(
          `This region is the last that can contribute a queen to given row/column. 
            All other cells in that region are ruled out`,
          areas.concludeThat.allRuledOutExceptRow(
            areas.get(areaId).empty.map(({ point }) => point),
            row,
          ),
        );
      });
  }
}
