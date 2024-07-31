export default function fileReader(file): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(`${reader.result}`);
    reader.onabort = () => reject("file reading was aborted");
    reader.onerror = () => reject("file reading has failed");
    reader.readAsDataURL(file);
  });
}
