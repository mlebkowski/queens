import PointValue from "@/solver/PointValue";
import Cell from "@/solver/Cell";
import State from "@/solver/State";
import AreaPoint from "@/solver/AreaPoint";

export default class Area {
  static ofColor(color: Color) {
    return new Area(Symbol(), color, []);
  }

  constructor(
    public readonly id: symbol,
    public readonly color: Color,
    public readonly points: AreaPoint[] = [],
  ) {}

  add(point: PointValue): void {
    this.points.push(point.ownedBy(this));
  }

  applyPoint({ value, point }: PointValue): boolean {
    return !!this.points
      .find(({ point: { x, y } }) => point.x === x && point.y === y)
      ?.apply(value);
  }

  get transposed(): Area {
    return new Area(
      this.id,
      this.color,
      this.points.map((point) => point.transposed),
    );
  }

  get empty(): AreaPoint[] {
    return this.points.filter(({ isEmpty }) => isEmpty);
  }

  get nonQueen(): AreaPoint[] {
    return this.points.filter(({ isQueen }) => !isQueen);
  }

  get solved() {
    return this.points.some(({ isQueen }) => isQueen);
  }

  get unsolved() {
    return !this.solved;
  }

  get cells(): Cell[] {
    return this.points.map(({ point, value }) => ({
      point,
      value,
      color: this.color,
    }));
  }
}
