import { describe, expect, it } from "@jest/globals";
import Conclusion from "@/solver/technique/Conclusion";

describe("Conclusion", () => {
  it("rules out correctly", () => {
    const given = { x: 4, y: 0 };
    const sut = new Conclusion(9);
    const actual = sut
      .queenAt(given)
      .filter(({ isRuledOut }) => isRuledOut)
      .map(({ point: { x, y } }) => `${x}×${y}`)
      .sort();
    expect(actual).toEqual([
      "0×0",
      "1×0",
      "2×0",
      "3×0",
      "3×1",
      "4×1",
      "4×2",
      "4×3",
      "4×4",
      "4×5",
      "4×6",
      "4×7",
      "4×8",
      "5×0",
      "5×1",
      "6×0",
      "7×0",
      "8×0",
    ]);
  });
});
