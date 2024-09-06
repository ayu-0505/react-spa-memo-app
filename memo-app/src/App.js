import React from "react";
import { useState } from "react";
import MemoList from "./MemoList.js";
import MemoForm from "./MemoForm.js";
import useLocalStrage from "./useLocalStrage.js";
import { useAuthentication } from "./loginContext.js";
import "./App.css";

function App() {
  const [memos, setMemos] = useLocalStrage("memos", []);
  const [editingId, setEditingId] = useState(null);
  const { isLoggedIn, handleToggleAuth } = useAuthentication();

  function handleAddClick(memoId) {
    const nextMemos = memos.concat({
      id: memoId,
      title: "新規メモ",
      content: "",
    });
    setMemos(nextMemos);
  }

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

  const Headline = editingId ? (isLoggedIn ? "編集" : "メモ詳細") : "一覧";

  return (
    <div className="App">
      <button onClick={handleToggleAuth}>
        {isLoggedIn ? "ログアウト" : "ログイン"}
      </button>
      <h1>{Headline}</h1>
      <section id="container">
        <MemoList
          memos={memos}
          onSelectId={setEditingId}
          onAdd={handleAddClick}
        />
        {Boolean(editingId) && (
          <MemoForm
            key={editingId}
            memo={memos.find((memo) => memo.id === editingId)}
            onReturnToList={() => {
              setEditingId(null);
            }}
            onUpdate={handleEditClick}
            onDelite={handleDeleteClick}
          />
        )}
      </section>
    </div>
  );
}

export default App;
