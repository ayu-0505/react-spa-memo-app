import React from "react";
import "./App.css";
import MemoList from "./MemoList.js";
import { useState } from "react";
import TextArea from "./TextArea.js";
import { v4 as uuid } from "uuid";

function App() {
  const memo1 = { id: uuid(), title: "memo1", content: "memo1_content" };
  const memo2 = { id: uuid(), title: "memo2", content: "memo2_content" };
  const memo3 = { id: uuid(), title: "memo3", content: "memo3_content" };
  const planeMemos = [memo1, memo2, memo3];
  const jsonMemos = JSON.stringify(planeMemos);
  localStorage.setItem("memos", jsonMemos);
  const parsedMemos = JSON.parse(localStorage.getItem("memos"));

  const [memos, setMemos] = useState(parsedMemos);
  const [editingId, setEditingId] = useState(null);

  function handleEditClick(memoId, title, content) {
    const nextMemos = memos.map((memo) => {
      if (memo.id === memoId) {
        return { ...memo, title, content };
      } else {
        return memo;
      }
    });
    setMemos(nextMemos);
  }

  function handleDeleteClick(memoId) {
    setMemos(memos.filter((memo) => memo.id !== memoId));
  }

  return (
    <div className="App">
      <body>
        <section>
          <h1>{editingId ? "編集" : "一覧"}</h1>
          <MemoList memos={memos} onSelectMemo={setEditingId} />
          {Boolean(editingId) && (
            <TextArea
              memo={memos.find((memo) => memo.id === editingId)}
              onCancelEditing={() => {
                setEditingId(null);
              }}
              onFinishEditing={handleEditClick}
              onDecideDelite={handleDeleteClick}
            />
          )}
        </section>
      </body>
    </div>
  );
}

export default App;
