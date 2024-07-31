import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";

export default class Transposing implements Technique {
  constructor(private readonly inner: Technique) {}

  deduct(areas: AreaCollection): Deduction[] {
    return this.inner
      .deduct(areas.transposed)
      .map((deduction) => deduction.transposed);
  }
}
