import PointValue from "@/solver/PointValue";
import State from "@/solver/State";
import AreaPoint from "@/solver/AreaPoint";

export default class Conclusion {
  constructor(private readonly size: number) {}

  queenAt(point: Point): PointValue[] {
    const line = [...Array(this.size).keys()].map((x) => ({ ...point, x }));
    const column = [...Array(this.size).keys()].map((y) => ({ ...point, y }));
    const corners = [
      { x: point.x - 1, y: point.y - 1 },
      { x: point.x + 1, y: point.y - 1 },
      { x: point.x - 1, y: point.y + 1 },
      { x: point.x + 1, y: point.y + 1 },
    ];

    const ruledOut = [...line, ...column, ...corners]
      .filter(({ x, y }) => !(x === point.x && y === point.y))
      .filter(({ x }) => 0 <= x && x < this.size)
      .filter(({ y }) => 0 <= y && y < this.size)
      .map((point) => new PointValue(point, State.RuledOut));

    return [new PointValue(point, State.Queen), ...ruledOut];
  }

  lineRuledOut(y: number, excludeColumns: number[]): PointValue[] {
    return [...Array(this.size).keys()]
      .filter((x) => !excludeColumns.includes(x))
      .map((x) => new PointValue({ y, x }, State.RuledOut));
  }

  sandwichRuledOut(
    ...[{ point: alpha }, { point: bravo }]: AreaPoint
  ): PointValue[] {
    // y is same
    // not caring if out of bounds!
    return [
      new PointValue({ x: alpha.x, y: alpha.y - 1 }, State.RuledOut),
      new PointValue({ x: alpha.x, y: alpha.y + 1 }, State.RuledOut),
      new PointValue({ x: bravo.x, y: alpha.y - 1 }, State.RuledOut),
      new PointValue({ x: bravo.x, y: alpha.y + 1 }, State.RuledOut),
    ];
  }

  pointRuledOut(point: Point): PointValue[] {
    return [new PointValue(point, State.RuledOut)];
  }

  allRuledOutExceptRow(
    toExclude: Point[],
    exceptRow: number | null,
  ): PointValue[] {
    return toExclude
      .filter(({ y }) => y !== exceptRow)
      .map((point) => new PointValue(point, State.RuledOut));
  }
}
