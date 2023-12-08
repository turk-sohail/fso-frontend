import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";

function App(props) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("add note");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);


  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleImportance = () => {
    setShowAll(!showAll);
  };

  const handleLogin = (event) => {
    event.preventDefault();
  }




  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

      <div>
        <button onClick={() => handleImportance}>
          {showAll ? "show important" : "show All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              note={note}
              key={note.id}
              toggleImportance={toggleImportanceOf}
            />
          );
        })}
      </ul>
      <form onSubmit={addNote}>
        <input
          onChange={handleInputChange}
          value={newNote}
          onClick={() => setNewNote("")}
        />
        <button>add note</button>
      </form>
    </div>
  );
}

export default App;
