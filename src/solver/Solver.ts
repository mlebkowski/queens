import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";
import Technique from "@/solver/technique/Technique";

export default class Solver {
  constructor(
    private readonly areas: AreaCollection,
    private readonly techniques: Technique[],
  ) {}

  get results(): Result[] {
    return this.areas.results;
  }

  *solve(): Generator<Deduction> {
    loop: while (true) {
      const deductions = this.techniques.flatMap((technique) =>
        technique.deduct(this.areas),
      );

      for (const deduction of deductions) {
        const appliedDeduction = this.areas.apply(deduction);
        if (appliedDeduction) {
          yield appliedDeduction;
          continue loop;
        }
      }

      // no applied
      break;
    }
  }
}
