import { useState } from "react";
import Note from "./components/Note";

function App(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("add note");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleImportance = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <button onClick={handleImportance}>
          {showAll ? "show important" : "show All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return <Note note={note} key={note.id} />;
        })}
        <form onSubmit={addNote}>
          <input
            onChange={handleInputChange}
            value={newNote}
            onClick={() => setNewNote("")}
          />
          <button>add note</button>
        </form>
      </ul>
    </div>
  );
}

export default App;
