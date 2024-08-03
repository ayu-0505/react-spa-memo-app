import React from "react";
import "./App.css";
import MemoList from "./MemoList.js";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <body>
        <section>
          <h1>一覧</h1>
          <MemoList />
        </section>
      </body>
    </div>
  );
}

export default App;
