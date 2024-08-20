import React from "react";

export default function MemoList({ memos, onSelectMemo }) {
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
    <section>
      <ui>
        {titles}
        <li>+</li>
      </ui>
    </section>
  );
}
