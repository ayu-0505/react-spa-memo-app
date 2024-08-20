import React from "react";

export default function TextArea({ memoId, onCancelEditing }) {
  return (
    <section>
      <textarea>{memoId}</textarea>
      <button onClick={onCancelEditing}>編集</button>
      <button onClick={onCancelEditing}>削除</button>
    </section>
  );
}
