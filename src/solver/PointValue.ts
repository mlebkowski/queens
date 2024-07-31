import State from "@/solver/State";
import Area from "@/solver/Area";
import AreaPoint from "@/solver/AreaPoint";

export default class PointValue {
  constructor(
    public readonly point: Point,
    public readonly value: State,
  ) {}

  ownedBy(area: Area) {
    return new AreaPoint(this.point, this.value, area);
  }

  get isRuledOut() {
    return this.value === State.RuledOut;
  }

  get transposed(): PointValue {
    const {
      point: { x: y, y: x },
      value,
    } = this;
    return new PointValue({ x, y }, value);
  }
}
