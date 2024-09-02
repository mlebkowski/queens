import { withBem } from "@puck/react-bem";

function DropPlaceholder({ bem: { className, element } }: withBem.props) {
  return (
    <div className={className}>
      <p className={element`text`}>Drop here or tap to upload</p>
      <img
        className={element`placeholder`}
        src="/placeholder.png"
        alt="Drop here"
      />
    </div>
  );
}

export default withBem.named("DropPlaceholder", DropPlaceholder);
