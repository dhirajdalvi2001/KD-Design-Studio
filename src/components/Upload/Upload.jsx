import classNames from "classnames";

export default function Upload({ handleUpload, className }) {
  return (
    <div className={classNames("", className)}>
      <input
        id="upload-input"
        key="upload-input"
        type="file"
        value=""
        onChange={handleUpload}
        accept="image/*, video/*"
        className={classNames("w-0 h-0 opacity-0")}
      />
      <label
        htmlFor="upload-input"
        className="flex justify-center items-center w-full h-32 bg-white/20 rounded-lg border-2 border-dashed cursor-pointer text-black"
      >
        Upload File
      </label>
    </div>
  );
}
