type ImageData = {
  bitmap: Uint8ClampedArray;
  width: number;
};
enum ColorIndex {
  Red = 0,
  Green = 1,
  Blue = 2,
}
type ReadQuery = Point & {
  index: ColorIndex;
};

const approximate =
  (bitmap: Uint8ClampedArray, width: number, bpp: number = 4) =>
  ({ x, y, index }: ReadQuery) => {
    const raw = bitmap.at((y * width + x) * bpp + index) as number;
    return raw - (raw % 20); // round to the nearest 5
  };

export default function readPixelMatrix(...matrix: Point[]) {
  return ({ bitmap, width }: ImageData): Color[] => {
    const reader = approximate(bitmap, width);

    return matrix.map(({ x, y }) => ({
      red: reader({ x, y, index: ColorIndex.Red }),
      green: reader({ x, y, index: ColorIndex.Green }),
      blue: reader({ x, y, index: ColorIndex.Blue }),
    }));
  };
}
