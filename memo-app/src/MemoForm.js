import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { loginContext } from "./loginContext.js";
import "./MemoForm.css";

export default function MemoForm({ memo, onReturnToList, onUpdate, onDelite }) {
  const [text, setText] = useState(`${memo.title}\n${memo.content}`);
  const newLine = text.indexOf("\n");
  const title = text.substring(0, newLine);
  const content = text.substring(newLine + 1);
  const isLoggedIn = useContext(loginContext);

  return (
    <section id="itemB">
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      {isLoggedIn && (
        <button
          onClick={() => {
            onUpdate(memo.id, title, content);
            onReturnToList();
          }}
        >
          編集
        </button>
      )}
      {isLoggedIn && (
        <button
          onClick={() => {
            onDelite(memo.id);
            onReturnToList();
          }}
        >
          削除
        </button>
      )}
    </section>
  );
}
