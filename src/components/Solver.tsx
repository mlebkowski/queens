import Grid from "@/components/Grid";
import SolverFactory from "@/solver/SolverFactory";
import ControlPanel from "@/components/ControlPanel";
import { useCallback, useState } from "react";
import Deductions from "@/components/Deductions";
import Deduction from "@/solver/Deduction";

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

  const [{ items }] = deductions.reverse().concat(new Deduction("Dummy", []));
  const highlights = items.map(({ point: { x, y } }) => x + size * y);

  return (
    <div>
      <Grid size={size} items={results} highlights={highlights} />
      <Deductions
        deductions={deductions}
        onNext={nextEnabled ? onNext : null}
        onPrev={step > 0 ? onPrev : null}
      />
    </div>
  );
}
