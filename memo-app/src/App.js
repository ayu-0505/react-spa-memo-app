import React from "react";
import { useState } from "react";
import "./App.css";
import MemoList from "./MemoList.js";
import TextArea from "./TextArea.js";
import useLocalStrage from "./useLocalStrage.js";

function App() {
  const [memos, setMemos] = useLocalStrage("memos", []);
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
    setMemos(nextMemos);
  }

  function handleDeleteClick(memoId) {
    const nextMemos = memos.filter((memo) => memo.id !== memoId);
    setMemos(nextMemos);
  }

  function handleAddClick(memoId) {
    const nextMemos = memos.concat({
      id: memoId,
      title: "新規メモ",
      content: "",
    });
    setMemos(nextMemos);
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
