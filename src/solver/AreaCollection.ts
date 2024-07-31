import Area from "@/solver/Area";
import Cell from "@/solver/Cell";
import Deduction from "@/solver/Deduction";
import Conclusion from "@/solver/technique/Conclusion";
import State from "@/solver/State";
import AreaPoint from "@/solver/AreaPoint";

type RowGroup = {
  row: number;
  points: AreaPoint[];
};

export default class AreaCollection {
  public readonly concludeThat: Conclusion;

  constructor(private readonly areas: Area[]) {
    this.concludeThat = new Conclusion(this.size);
  }

  apply(deduction: Deduction): Deduction | null {
    const appliedPoints = deduction.items.filter((point) =>
      this.areas.some((area) => area.applyPoint(point)),
    );
    if (!appliedPoints.length) {
      return null;
    }

    return new Deduction(deduction.description, appliedPoints);
  }

  get(areaId: symbol): Area {
    const area = this.areas.find(({ id }) => id === areaId);
    if (!area) {
      throw new Error("Area with given id not found");
    }
    return area;
  }

  get transposed(): AreaCollection {
    return new AreaCollection(this.areas.map((area) => area.transposed));
  }

  get size() {
    return (
      1 +
      this.cells.reduce((max, { point }) => Math.max(max, point.x, point.y), 0)
    );
  }

  get unsolved() {
    return this.areas.filter((area) => area.unsolved);
  }

  get rows(): RowGroup[] {
    return Object.entries(
      this.areas
        .flatMap((area) => area.points)
        .reduce(
          (acc, point: AreaPoint) => ({
            ...acc,
            [point.point.y]: (acc[point.point.y] || []).concat(point),
          }),
          {},
        ),
    ).map(([row, points]) => ({ row: parseInt(row), points }));
  }

  get results(): Result[] {
    return this.cells
      .sort(
        ({ point: alpha }, { point: bravo }) =>
          alpha.y - bravo.y || alpha.x - bravo.x,
      )
      .map((cell) => ({
        ...cell.color,
        content: cell.value,
        queen: cell.value === State.Queen,
      }));
  }

  private get cells(): Cell[] {
    return this.areas.reduce(
      (cells: [], area: Area) => area.cells.concat(cells),
      [],
    );
  }
}
