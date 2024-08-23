import React from "react";
import { useState } from "react";
import "./TextArea.css";

export default function TextArea({
  memo,
  onCancelEditing,
  onFinishEditing,
  onDecideDelite,
}) {
  const [text, setText] = useState(`${memo.title}\n${memo.content}`);
  const firstIndex = text.indexOf("\n");
  const title = text.substring(0, firstIndex);
  const content = text.substring(firstIndex + 1);
  // const formattedText = text.replace(/\n/g, "<br>");

  return (
    <section>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <p>{title}</p>
      <p>{content}</p>
      <button
        onClick={() => {
          onFinishEditing(memo.id, title, content);
          onCancelEditing();
        }}
      >
        編集
      </button>
      <button
        onClick={() => {
          onDecideDelite(memo.id);
          onCancelEditing();
        }}
      >
        削除
      </button>
    </section>
  );
}
