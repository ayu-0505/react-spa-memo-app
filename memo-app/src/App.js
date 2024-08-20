import React from "react";
import "./App.css";
import MemoList from "./MemoList.js";
import { useState } from "react";
import TextArea from "./TextArea.js";

function App() {
  const memo1 = { id: 1, title: "memo1", content: "memo1_content" };
  const memo2 = { id: 2, title: "memo2", content: "memo2_content" };
  const memo3 = { id: 3, title: "memo3", content: "memo3_content" };
  const planeMemos = [memo1, memo2, memo3];
  const jsonMemos = JSON.stringify(planeMemos);
  localStorage.setItem("memos", jsonMemos);
  const parsedMemos = JSON.parse(localStorage.getItem("memos"));

  const [memos, setMemos] = useState(parsedMemos);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="App">
      <body>
        <section>
          <h1>{editingId ? "編集" : "一覧"}</h1>
          <MemoList memos={memos} onSelectMemo={setEditingId} />
          {Boolean(editingId) && (
            <TextArea
              memoId={editingId}
              onCancelEditing={() => {
                setEditingId(null);
              }}
            />
          )}
        </section>
      </body>
    </div>
  );
}

export default App;
