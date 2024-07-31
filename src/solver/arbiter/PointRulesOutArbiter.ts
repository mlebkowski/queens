import Conclusion from "@/solver/technique/Conclusion";

export default function pointRulesOutArbiter(
  alpha: Point,
  bravo: Point,
): boolean {
  const toString = ({ x, y }: Point) => `${x}×${y}`;

  const size = Math.max(alpha.x, alpha.y, bravo.x, bravo.y) + 1;
  const conclusion = new Conclusion(size);
  const ruledOut = conclusion
    .queenAt(alpha)
    .filter(({ isRuledOut }) => isRuledOut)
    .map(({ point }) => toString(point));

  return ruledOut.includes(toString(bravo));
}
