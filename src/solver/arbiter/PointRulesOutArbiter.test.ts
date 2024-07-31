import { describe, expect, test } from "@jest/globals";
import pointRulesOutArbiter from "@/solver/arbiter/PointRulesOutArbiter";

describe("pointRulesOutArbiter", () => {
  test.each([
    { alpha: { x: 5, y: 5 }, bravo: { x: 5, y: 5 }, expected: false },
    { alpha: { x: 5, y: 5 }, bravo: { x: 5, y: 6 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 4, y: 6 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 4, y: 5 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 4, y: 4 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 5, y: 4 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 5, y: 4 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 6, y: 4 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 6, y: 5 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 6, y: 6 }, expected: true },

    { alpha: { x: 5, y: 5 }, bravo: { x: 5, y: 0 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 5, y: 8 }, expected: true },

    { alpha: { x: 5, y: 5 }, bravo: { x: 0, y: 5 }, expected: true },
    { alpha: { x: 5, y: 5 }, bravo: { x: 8, y: 5 }, expected: true },

    { alpha: { x: 5, y: 5 }, bravo: { x: 1, y: 1 }, expected: false },
    { alpha: { x: 5, y: 5 }, bravo: { x: 4, y: 3 }, expected: false },
    { alpha: { x: 5, y: 5 }, bravo: { x: 3, y: 4 }, expected: false },
  ])("it works ($alpha, $bravo)", ({ alpha, bravo, expected }) => {
    expect(pointRulesOutArbiter(alpha, bravo)).toBe(expected);
  });
});
