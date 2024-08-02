import Grid from "@/components/Grid";
import SolverFactory from "@/solver/SolverFactory";
import { useCallback, useState } from "react";
import Deduction from "@/solver/Deduction";
import Deductions from "@/components/Deductions";

function getLastDeductionItems(deductions: Deduction[]) {
  const [lastDeduction] = [...deductions].reverse();
  return lastDeduction?.items || [];
}

export default function Solver({ colors }: { colors: Color[] }) {
  const [step, setStep] = useState(0);
  const onNext = useCallback(() => setStep((step) => step + 1), [setStep]);
  const onPrev = useCallback(() => setStep((step) => step - 1), [setStep]);

  const size = Math.sqrt(colors.length);
  const solver = SolverFactory.fromCells(colors, size);

  const engine = solver.solve();
  const deductions = [...Array(step).keys()].reduce(
    (acc) => acc.concat(engine.next().value),
    [],
  );

  // copy before we peek:
  const results = solver.results;
  const nextEnabled = !engine.next().done;
  const highlights = getLastDeductionItems(deductions).map(
    ({ point: { x, y } }) => x + size * y,
  );

  return (
    <div>
      <Grid size={size} items={results} highlights={highlights} />
      <Deductions
        deductions={deductions}
        onNext={nextEnabled ? onNext : undefined}
        onPrev={step > 0 ? onPrev : undefined}
      />
    </div>
  );
}
