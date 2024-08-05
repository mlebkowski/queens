import { withBem } from "@puck/react-bem";
import { useCallback } from "react";
import Persistence from "@/state/Persistence";

type Props = {
  data: string;
  imagePath: string;
  onLoad: (colors: Color[]) => void;
};
export default function ExampleItem({
  bem: { element },
  data,
  imagePath,
  onLoad,
}: withBem.props<Props>) {
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey) {
        return;
      }

      e.preventDefault();
      onLoad(Persistence.loadFromString(data));
    },
    [onLoad, data],
  );

  return (
    <li className={element`item`}>
      <a href={`#${data}`} onClick={onClick}>
        <img src={imagePath} alt="" className={element`image`} />
      </a>
    </li>
  );
}
