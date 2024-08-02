"use client";

import ImageDrop from "@/components/ImageDrop";
import { useCallback, useEffect, useState } from "react";
import Solver from "@/components/Solver";
import Persistence from "@/state/Persistence";

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => setColors(Persistence.load()), [setColors]);

  const onLoad = useCallback(
    (colors: Color[]) => {
      setColors(colors);
      Persistence.save(colors);
    },
    [setColors],
  );
  const reset = useCallback(() => onLoad([]), [onLoad]);

  const isLoaded = !!colors.length;

  return (
    <ImageDrop onLoad={onLoad} reset={reset} isLoaded={isLoaded}>
      {isLoaded && <Solver colors={colors} />}
    </ImageDrop>
  );
}
