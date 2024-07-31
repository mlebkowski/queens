import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";
import Conclusion from "@/solver/technique/Conclusion";
import Area from "@/solver/Area";

const unique = <T>(items: T[]): T[] => [...new Set(items)];
const uniqueCoords = (area: Area, prop: string): number[] =>
  unique(area.empty.map(({ point }) => point[prop]));

export default class OneRowWideArea implements Technique {
  deduct(areas: AreaCollection): Deduction[] {
    return (
      areas.unsolved
        .map((area) => ({
          rows: uniqueCoords(area, "y"),
          columns: uniqueCoords(area, "x"),
        }))
        // they occupy only one row
        .filter(({ rows }) => rows.length === 1)
        // and they don’t span across the whole grid:
        .filter(({ columns }) => columns.length < areas.size)
        .map(
          ({ rows, columns }) =>
            new Deduction(
              `Area empty cells occupy a single row/column: ${rows[0] + 1}`,
              areas.concludeThat.lineRuledOut(rows[0], columns),
            ),
        )
    );
  }
}
