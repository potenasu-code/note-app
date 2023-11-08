import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedText, setEditedText] = useState("");

  //メモを追加ボタンを押したときの処理
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      text: "新規ノート📝",
    };

    setNotes((prevNote) => [...prevNote, newNote]);
    setSelectedNote(newNote);
    setEditedText(newNote.text);
  };

  //ノートを選択したときの処理
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setEditedText(note.text);
  };

  //削除ボタンを押したときの処理
  const handleNoteDelete = (noteId) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);

    if (filteredNotes.length > 0) {
      const lastNote = filteredNotes[filteredNotes.length - 1];
      setSelectedNote(lastNote);
    } else {
      setSelectedNote(null);
    }
  };

  //textareaの文字を変更したときの処理
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  //保存ボタンを押したときの処理
  const handleSave = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === selectedNote.id) {
        return { ...note, text: editedText };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      {/* サイドバーエリア */}
      <div className="sidebar">
        <button id="create" onClick={handleAddNote}>
          ノート追加
        </button>
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className={selectedNote.id === note.id ? "selected" : ""}
            >
              <button
                onClick={() => handleNoteDelete(note.id)}
                className="delete"
              >
                削除
              </button>
              <span onClick={() => handleSelectNote(note)}>{note.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* メインエリア */}
      <div className="main">
        {selectedNote ? (
          <>
            <h2>内容</h2>
            <textarea value={editedText} onChange={handleTextChange} />
            <button className="save" onClick={handleSave}>
              保存
            </button>
          </>
        ) : (
          <p>新しいノートを作成する</p>
        )}
      </div>
    </div>
  );
};

export default App;
