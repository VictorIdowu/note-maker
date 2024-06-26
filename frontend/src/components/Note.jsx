import React, { useEffect, useRef, useState } from "react";

const Note = ({ note, onDelete, onEdit }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditting] = useState(false);
  const editRef = useRef();

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, []);

  useEffect(() => {
    const btn = editRef.current;
    title !== note.title || content !== note.content
      ? (btn.disabled = false)
      : (btn.disabled = true);
  }, [content, title, editRef]);

  const handleEditContent = (e) => {
    const textarea = e.target;
    setContent(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="w-full flex flex-col gap-2 p-3 bg-white drop-shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">{formattedDate}</p>
        <button
          onClick={() => setIsEditting((prev) => !prev)}
          className="text-end text-blue-500"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      {!isEditing ? (
        <div className="flex flex-col gap-2">
          <p>{note.title}</p>
          <p className="">{note.content}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            className="focus:outline-none border border-gray-200 bg-white h-11 pl-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <textarea
            className="focus:outline-none border border-gray-200 bg-white pl-2 h-32 rounded resize-none overflow-hidden"
            value={content}
            onChange={handleEditContent}
            type="text"
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          className="bg-red-500 text-white py-1 px-3 w-fit rounded"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
        <button
          ref={editRef}
          className="bg-blue-500 text-white py-1 px-3 w-fit rounded "
          onClick={async () => {
            await onEdit(note.id, { title, content });
            setIsEditting(false);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Note;
