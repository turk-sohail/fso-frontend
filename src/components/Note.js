const Note = ({ note, toggleImportance }) => {
  return (
    <div>
      <li>{note.content}</li>
      <button onClick={() => toggleImportance(note.id)}>
        {note.important ? "make not important" : "make important"}
      </button>
    </div>
  );
};

export default Note;
