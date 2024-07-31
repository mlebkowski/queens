import { withBem } from "@/bem";

function DropPlaceholder({ bem: { root, element } }) {
  return (
    <div className={root}>
      <p className={element`text`}> Drop here.</p>
      <img
        className={element`placeholder`}
        src="/placeholder.png"
        alt="Drop here"
      />
    </div>
  );
}

export default withBem(DropPlaceholder);
