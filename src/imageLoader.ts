type Result = {
  width: number;
  bitmap: Uint8ClampedArray;
};

export default function imageLoader(...matrix: Point[]) {
  return (dataUrl: string): Promise<Result> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = document.createElement("img");
      // document.body.appendChild(canvas);
      img.onload = () => {
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve({
          width: img.width,
          bitmap: ctx.getImageData(0, 0, img.width, img.height).data,
        });
        // for (const point of matrix) {
        //   const dot = ctx.createImageData(3, 3);
        //   ctx.putImageData(dot, point.x, point.y);
        // }
      };
      img.src = dataUrl;
    });
  };
}
