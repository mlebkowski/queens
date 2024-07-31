import Technique from "@/solver/technique/Technique";
import AreaCollection from "@/solver/AreaCollection";
import Deduction from "@/solver/Deduction";

export default class LastSpotForRow implements Technique {
  deduct(areas: AreaCollection): Deduction[] {
    const frequencies = areas.unsolved
      .flatMap((area) => area.empty.map(({ point: { y } }) => y))
      .reduce(
        (acc, n) => ({
          ...acc,
          [n]: (acc[n] || 0) + 1,
        }),
        {},
      );

    return Object.entries(frequencies)
      .filter(([, qty]) => qty === 1)
      .map(([row]: [string, number]) => parseInt(row))
      .map((row) => {
        const column = areas.unsolved
          .flatMap((area) => area.empty.filter(({ point: { y } }) => row === y))
          .map(({ point: { x } }) => x)
          .find(() => true);

        return new Deduction(
          `The last empty spot in given row/column: ${row}`,
          areas.concludeThat.queenAt({ x: column as number, y: row }),
        );
      });
  }
}
