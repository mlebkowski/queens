import State from "@/solver/State";
import Area from "@/solver/Area";

// todo: all method usage
export default class AreaPoint {
  constructor(
    public readonly point: Point,
    private _value: State,
    public readonly area: Area,
  ) {}

  get value(): State {
    return this._value;
  }

  get isEmpty(): boolean {
    return this._value === State.Empty;
  }

  get isQueen(): boolean {
    return this._value === State.Queen;
  }

  get isRuledOut(): boolean {
    return this._value === State.RuledOut;
  }

  get transposed(): AreaPoint {
    const {
      point: { x: y, y: x },
      value,
      area,
    } = this;
    return new AreaPoint({ x, y }, value, area);
  }

  apply(value: State): boolean {
    if ([this._value, State.Empty].includes(value)) {
      return false;
    }

    if (this.isQueen) {
      throw new Error(
        `Tried to rule out a field that already holds a queen: ${this.point.x}×${this.point.y}`,
      );
    }
    if (this.isRuledOut) {
      throw new Error(
        `Tried to put a queen on a previously ruled out field: ${this.point.x}×${this.point.y}`,
      );
    }

    this._value = value;
    return true;
  }
}
