import React from "react";
import { v4 as uuid } from "uuid";
import { useAuthentication } from "./authContext.js";
import "./MemoList.css";

export default function MemoList({ memos, onSelectId, onAdd }) {
  const titles = memos.map((memo) => (
    <li
      key={memo.id}
      onClick={() => {
        onSelectId(memo.id);
      }}
    >
      {memo.title}
    </li>
  ));
  const { isLoggedIn } = useAuthentication();

  return (
    <section id="itemA">
      <ul>
        {titles}
        {isLoggedIn && (
          <li
            key="newMemo"
            onClick={() => {
              const newId = uuid();
              onAdd(newId);
              onSelectId(newId);
            }}
          >
            ＋
          </li>
        )}
      </ul>
    </section>
  );
}
