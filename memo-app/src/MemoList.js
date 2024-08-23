import React from "react";
import { v4 as uuid } from "uuid";
import "./MemoList.css";

export default function MemoList({ memos, onSelectMemo, onAddMemo }) {
  const titles = memos.map((memo) => (
    <li
      key={memo.id}
      onClick={() => {
        onSelectMemo(memo.id);
      }}
    >
      {memo.title}
    </li>
  ));
  return (
    <section id="itemA">
      <ui>
        {titles}
        <li
          key="newMemo"
          onClick={() => {
            const newId = uuid();
            onAddMemo(newId);
            onSelectMemo(newId);
          }}
        >
          +
        </li>
      </ui>
    </section>
  );
}
