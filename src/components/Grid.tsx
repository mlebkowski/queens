import { withBem } from "@puck/react-bem";
import { useCallback, useState } from "react";

type Props = {
  items: Result[];
  size: number;
  highlights: number[];
};
type ModifiersArgs = {
  i: number;
  queen: boolean;
};

function Grid({ bem, size, items, highlights }: withBem.props<Props>) {
  const modifiers = useCallback(
    ({ i, queen }: ModifiersArgs) => ({
      highlighted: highlights.includes(i),
      queen,
    }),
    [highlights],
  );

  return (
    <div className={bem} style={{ "--size": size } as React.CSSProperties}>
      {items.map(({ red, green, blue, content, queen }, i) => (
        <span
          className={bem.element`cell ${modifiers({ i, queen })}`}
          key={i}
          style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
          title={`rgb(${red}, ${green}, ${blue})`}
        >
          {content}
        </span>
      ))}
    </div>
  );
}
export default withBem.named("Grid", Grid);
