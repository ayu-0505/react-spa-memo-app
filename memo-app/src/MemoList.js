import React from "react";
import TextArea from "./TextArea.js";

export default function MemoList() {
  return (
    <section>
      <ui>
        <li>メモ1</li>
        <li>メモ2</li>
        <li>メモ3</li>
        <li>+</li>
      </ui>
      <TextArea />
    </section>
  );
}
