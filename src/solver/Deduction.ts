import PointValue from "@/solver/PointValue";

export default class Deduction {
  constructor(
    public readonly description: string,
    public readonly items: PointValue[],
  ) {}

  get transposed(): Deduction {
    return new Deduction(
      this.description,
      this.items.map((point) => point.transposed),
    );
  }
}
