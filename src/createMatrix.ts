type MatrixSpec = {
  offset: Point;
  count: number;
  size: number;
  cornerOffset: number;
};
export default function* createMatrix({
  size,
  count,
  cornerOffset,
  offset,
}: MatrixSpec): Generator<Point> {
  const pieceSize = Math.round(size / count);
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      yield {
        x: offset.x + x * pieceSize + cornerOffset,
        y: offset.y + y * pieceSize + cornerOffset,
      };
    }
  }
}
