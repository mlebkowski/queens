import { withBem } from "@/bem";
import ExampleItem from "@/components/ExampleItem";

type Props = {
  onLoad: (colors: Color[]) => void;
};

function Examples({ bem, onLoad }: withBem.props<Props>) {
  return (
    <div className={bem}>
      Don’t have a screenshot? Try some of these example grids:
      <ul className={bem.element`list`}>
        <ExampleItem
          bem={bem}
          onLoad={onLoad}
          data={
            "oMjIoMjIoMjIoMjI3NzcoNygoNygjLTwjLTwoMjI3Nzc3Nzc3Nzc3Nzc3NzcoNygoNygjLTwoMjI3Nzc3Nzc3Nzc8HhQ3Nzc3NzcoNygjLTw3Nzc3Nzc3Nzc3Nzc8HhQ3Nzc3NzcoNygjLTw3Nzc3KC03KC03KC08HhQ8HhQ3Nzc3NzcjLTw3Nzc3KC03PB43KC03KC08HhQ8HhQ3Nzc8MiM3Nzc3Nzc3PB43Nzc3Nzc3Nzc3Nzc3Nzc8MiM3Nzc3Nzc3PB43Nzc3NzctKDctKDctKDc8MiM3PB43PB43PB4tKDctKDctKDc8MiM8MiM8MiM"
          }
          imagePath="/alpha.jpeg"
        />
        <ExampleItem
          bem={bem}
          onLoad={onLoad}
          data={
            "jLTwjLTwjLTwjLTw8MiM8MiM8MiM8MiM8MiMjLTwtKDctKDcjLTwoNygoNygoNyg8MiM8MiMjLTwjLTwjLTwjLTwoNygoMjIoNyg8MiM8MiM3Nzc3Nzc3Nzc8MiMoNygoMjIoNyg8MiM8MiM3PB43PB43Nzc8MiMoNygoNygoNyg8MiM8MiM3PB43PB43Nzc8MiM8MiM8MiM8MiM8MiM8MiM3Nzc3Nzc3Nzc8MiM8MiM3KC03KC03KC03KC08MiM8MiM8MiM8MiM8MiM3KC08HhQ8HhQ3KC08MiM8MiM8MiM8MiM8MiM3KC03KC03KC03KC0"
          }
          imagePath="/bravo.jpeg"
        />
        <ExampleItem
          bem={bem}
          onLoad={onLoad}
          data={
            "tKDctKDctKDc8MiM8MiM8MiM8MiM8MiMjLTwoNyg3NzctKDctKDc3KC08MiM8MiM8MiMjLTwoNyg3Nzc3Nzc3KC03KC03KC08MiM8MiMjLTwoNygoNyg3Nzc3KC03KC03KC0jLTwjLTwjLTwoNygoMjI3KC03KC03KC03KC03KC0jLTw8HhQoMjIoMjI3KC03KC03KC03KC03KC08HhQ8HhQoMjI3KC03KC03KC03KC03KC03KC03KC08HhQ3KC03KC03KC03KC03PB43KC03KC03KC03KC03KC03KC03PB43PB43PB43PB43PB43KC03KC0"
          }
          imagePath="/charlie.jpeg"
        />
        <ExampleItem
          bem={bem}
          onLoad={onLoad}
          data={
            "3PB43PB43PB43PB43PB43PB43PB48HhQ3PB4tKDctKDctKDc3KC08HhQ8HhQ8HhQ3PB4tKDc3Nzc3Nzc3KC0oMjIoMjIoMjI3PB4tKDc3Nzc3Nzc3KC03KC03KC0oMjI3PB4jLTw3Nzc3Nzc3Nzc3NzcoNygoMjI3PB4jLTw3Nzc3Nzc3Nzc3NzcoNyg3PB43PB4jLTwjLTwjLTwoNygoNygoNyg3PB43PB43PB43PB43PB43PB43PB43PB43PB4"
          }
          imagePath="/delta.jpeg"
        />
        <ExampleItem
          bem={bem}
          onLoad={onLoad}
          data={
            "tKDc8MiM8MiM8MiM8MiMjLTwjLTwjLTwtKDctKDc8MiMoNygoNygoNygjLTwoNygtKDc8MiM8MiMoNygoNygoNygoNygoNyg8MiM8MiM8MiMoNygoNygoNyg3NzcoNyg8MiM8MiM8MiM8MiMoNyg3Nzc3Nzc3Nzc3KC08MiM8MiM8MiMoNygoMjIoMjIoMjI3KC03KC08MiM8MiMoMjIoMjI8HhQoMjI3KC08MiM8MiM8MiM8MiM8HhQ8HhQ8HhQ"
          }
          imagePath="/echo.jpeg"
        />
      </ul>
    </div>
  );
}

export default withBem(Examples);
