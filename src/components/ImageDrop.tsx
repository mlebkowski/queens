import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { withBem } from "@puck/react-bem";
import fileReader from "@/fileReader";
import imageLoader from "@/imageLoader";
import readPixelMatrix from "@/readPixelMatrix";
import createMatrix from "@/createMatrix";
import DropPlaceholder from "@/components/DropPlaceholder";
import classNames from "classnames";
import Examples from "@/components/Examples";

type Props = PropsWithChildren<{
  onLoad: (colors: Color[]) => void;
  reset: () => void;
  isLoaded: boolean;
}>;

function ImageDrop({
  bem: { block, element },
  onLoad,
  children,
  reset,
  isLoaded,
}: withBem.props<Props>) {
  const [count, setCount] = useState(9);
  const [file, setFile] = useState<string>();

  const onDrop = useCallback((files: Blob[]) => {
    files.forEach((file) => fileReader(file).then(setFile));
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }

    imageLoader(file)
      .then(
        readPixelMatrix(
          ...createMatrix({
            offset: {
              y: 320,
              x: 60,
            },
            count,
            cornerOffset: 12,
            size: 1050,
          }),
        ),
      )
      .then(onLoad);
  }, [file, count, onLoad]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: !!children,
    maxFiles: 1,
    multiple: false,
    accept: { "image/*": [] },
  });

  const placeholder = <DropPlaceholder />;
  const contents = isDragActive || !children ? placeholder : children;

  return (
    <div className={block`${{ active: isDragActive }}`}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {contents}
      </div>
      <div className={element`settings`.mix`btn-toolbar`}>
        Number of areas in the grid is{" "}
        <div className="btn-group ms-2">
          {[8, 9, 10, 11].map((number) => (
            <button
              key={number}
              className={classNames("btn btn-light btn-sm", {
                active: count === number,
              })}
              onClick={() => setCount(number)}
            >
              {number}
            </button>
          ))}
        </div>
        {isLoaded && (
          <div className={element`reset`.mix`btn-group`}>
            <button className="btn btn-outline-danger btn-sm" onClick={reset}>
              × reset
            </button>
          </div>
        )}
        {!isLoaded && (
          <Examples className={element`examples`} onLoad={onLoad} />
        )}
      </div>
    </div>
  );
}

export default withBem.named("ImageDrop", ImageDrop);
