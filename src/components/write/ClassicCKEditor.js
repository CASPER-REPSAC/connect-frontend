import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const ClassicCKEditor = ({ onChange, value, name }) => {
  const editorConfiguration = {
    toolbar: [
      "bold",
      "italic",
      "undo",
      "redo",
      "numberedList",
      "bulletedList",
      "link",
    ],
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={value}
        onChange={(event, editor) => {
          onChange({
            target: { value: editor.getData(), name: name },
          });
        }}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              "400px",
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              "background",
              "var(--color-bg-base)",
              editor.editing.view.document.getRoot()
            );
          });
        }}
      />
    </div>
  );
};

export default ClassicCKEditor;
