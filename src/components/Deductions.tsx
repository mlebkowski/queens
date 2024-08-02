import { withBem } from "@/bem";
import Deduction from "@/solver/Deduction";

type Props = {
  onNext: (() => void) | undefined;
  onPrev: (() => void) | undefined;
  deductions: Deduction[];
};

function Deductions({
  bem: { root, element },
  deductions,
  onNext,
  onPrev,
}: withBem.props<Props>) {
  return (
    <div className={root}>
      <div className={element`buttons`.mix`btn-group`}>
        <button
          className="btn btn-md btn-primary"
          onClick={onNext}
          disabled={onNext === null}
        >
          Next
        </button>
        <button
          className="btn btn-md btn-secondary"
          onClick={onPrev}
          disabled={onPrev === null}
        >
          Prev
        </button>
      </div>
      <ul className={element`descriptions`}>
        {deductions
          .reverse()
          .slice(0, 1)
          .map(({ description }, i) => (
            <li key={i}>{description}</li>
          ))}
      </ul>
    </div>
  );
}

export default withBem(Deductions);
