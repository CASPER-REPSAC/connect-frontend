import React from "react";

export const PreviewFile = ({ file }) => {
  return (
    <div className="w-24 absolute  bottom-[25px] left-2 hidden peer-hover:block bg-background-50 drop-shadow-lg rounded">
      <div className="w-24 h-24 relative">
        <img
          src={`/api/activities/${file.activityid}/chapter/${file.chapterid}/download/${file.filepath}`}
          alt={file.filename}
          className="absolute top-0 left-0  object-cover w-full h-full m-auto"
        />
      </div>
      <div className="text-text-100 bg-background-600 w-24 break-words px-2 py-1 leading-4">
        {file.filename}
      </div>
    </div>
  );
};

export default PreviewFile;
