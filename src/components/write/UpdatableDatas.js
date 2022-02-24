import React, { useState, useEffect } from "react";
import { isArray } from "#serv";
import { Muted } from "#comp/common";
import { PreviewFile } from "#comp/chapters";
import { TrashCanSVG } from "@/icons";

export function UpdatableDatas() {
  return (
    <div>
      <div>dfd</div>
    </div>
  );
}

const DeletableChapterFileItem = ({ file, setFileDelete, fileDelete }) => {
  return (
    <div>
      <button
        className="relative "
        onClick={() => {
          if (fileDelete.indexOf(file.filepath) === -1)
            setFileDelete(fileDelete.concat(file.filepath));
          else
            setFileDelete(
              fileDelete.filter((dFile) => dFile !== file.filepath)
            );
        }}
      >
        <div
          className={
            "peer transition-all text-sm " +
            (fileDelete.indexOf(file.filepath) > -1
              ? " line-through text-alert"
              : "")
          }
        >
          <span className="text-alert mr-2 text-md">
            <TrashCanSVG />
          </span>
          {file.filename}
        </div>
        <PreviewFile file={file} />
      </button>
    </div>
  );
};

// {"filepk":20,"activityid":116,"chapterid":113,"filepath":"2ad364ed-72a4-45b8-9fad-028bb9ec398c.png","filename":"stego.png"}
export const DeletableChapterFileList = ({ files, onDeleteFilesChange }) => {
  const [fileDelete, setFileDelete] = useState([]);
  useEffect(() => {
    onDeleteFilesChange(fileDelete);
  }, [fileDelete, onDeleteFilesChange]);

  return (
    <div>
      <h4 className="text-text-600">기존 파일 관리</h4>
      <div className="flex gap-3">
        {isArray(files) ? (
          files.map((file) => (
            <DeletableChapterFileItem
              key={file.filepk}
              file={file}
              setFileDelete={setFileDelete}
              fileDelete={fileDelete}
            />
          ))
        ) : (
          <Muted>파일이 없습니다.</Muted>
        )}
      </div>
    </div>
  );
};

export const DeletableParticipantsList = ({ participants }) => {
  return (
    <div>
      <h4 className="text-text-600">참여자 관리</h4>
    </div>
  );
};

export default UpdatableDatas;
