import { withBem } from "@puck/react-bem";

function DropPlaceholder({ bem: { className, element } }: withBem.props) {
  return (
    <div className={className}>
      <p className={element`text`}> Drop here.</p>
      <img
        className={element`placeholder`}
        src="/placeholder.png"
        alt="Drop here"
      />
    </div>
  );
}

export default withBem.named("DropPlaceholder", DropPlaceholder);
