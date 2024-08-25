import React from "react";
import "./App.css";
import MemoList from "./MemoList.js";
import { useState } from "react";
import TextArea from "./TextArea.js";

function App() {
  const [memos, setMemos] = useState(() => {
    try {
      const memos = localStorage.getItem("memos");
      return memos ? JSON.parse(memos) : [];
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
      } else {
        throw error;
      }
      return [];
    }
  });
  const [editingId, setEditingId] = useState(null);

  function handleEditClick(memoId, title, content) {
    if (title === "") {
      title = "No Title";
    }
    const nextMemos = memos.map((memo) => {
      if (memo.id === memoId) {
        return { ...memo, title, content };
      } else {
        return memo;
      }
    });
    const jsonMemos = JSON.stringify(nextMemos);
    localStorage.setItem("memos", jsonMemos);
    setMemos(nextMemos);
  }

  function handleDeleteClick(memoId) {
    const nextMemos = memos.filter((memo) => memo.id !== memoId);
    const jsonMemos = JSON.stringify(nextMemos);
    localStorage.setItem("memos", jsonMemos);
    setMemos(nextMemos);
  }

  function handleAddClick(memoId) {
    const nextMemos = memos.concat({
      id: memoId,
      title: "新規メモ",
      content: "",
    });
    const jsonMemos = JSON.stringify(nextMemos);
    localStorage.setItem("memos", jsonMemos);
    setMemos(nextMemos);
  }

  return (
    <div className="App">
      <body>
        <h1>{editingId ? "編集" : "一覧"}</h1>
        <section id="container">
          <MemoList
            memos={memos}
            onSelectMemo={setEditingId}
            onAddMemo={handleAddClick}
          />
          {Boolean(editingId) && (
            <TextArea
              key={editingId}
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
