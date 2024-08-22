import React from "react";
import "./App.css";
import MemoList from "./MemoList.js";
import { useState } from "react";
import TextArea from "./TextArea.js";

function App() {
  // const memo1 = { id: uuid(), title: "memo1", content: "memo1_content" };
  // const memo2 = { id: uuid(), title: "memo2", content: "memo2_content" };
  // const memo3 = { id: uuid(), title: "memo3", content: "memo3_content" };
  // const planeMemos = [memo1, memo2, memo3];
  // const jsonMemos = JSON.stringify(planeMemos);
  // localStorage.setItem("memos", jsonMemos);
  // const parsedMemos = JSON.parse(localStorage.getItem("memos"));

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
        <section>
          <h1>{editingId ? "編集" : "一覧"}</h1>
          <MemoList
            memos={memos}
            onSelectMemo={setEditingId}
            onAddMemo={handleAddClick}
          />
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
