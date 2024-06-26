import React, { useCallback, useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNotes = useCallback(async () => {
    try {
      const res = await api.get("/api/notes/");

      const data = await res.data;
      // console.log(data);
      setNotes(data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const deleteNotes = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);

      if (res.status === 204) {
        console.log("Note deleted!");
        await getNotes();
      } else {
        throw new Error("Failed to delete note.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const editNotes = async (id, data) => {
    try {
      const res = await api.put(`/api/notes/update/${id}/`, data);

      if (res.status === 200) {
        console.log("Note Updated!");
        await getNotes();
      } else {
        throw new Error("Failed to update note.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const createNotes = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", { content, title });
      if (res.status === 201) {
        console.log("Note created!");
        await getNotes();
      } else {
        throw new Error("Failed to make note.");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className="mb-8">
      <div>
        <h2 className="text-center text-2xl text-blue-800 font-bold mb-6">
          Notes
        </h2>
        <div className="max-w-[700px] mx-auto flex flex-col gap-3 md:grid md:grid-cols-2">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={deleteNotes}
              onEdit={editNotes}
            />
          ))}
        </div>
      </div>
      <form
        className="mt-6 max-w-[500px] mx-auto bg-white drop-shadow-md p-6 rounded flex flex-col gap-6"
        onSubmit={createNotes}
      >
        <h2 className="text-center text-2xl text-blue-800 font-bold">
          Create a note
        </h2>
        <label
          className="flex flex-col gap-[1px] text-blue-950"
          htmlFor="title"
        >
          Title
          <input
            className="border-2 border-gray-400 h-11 rounded-md pl-2 focus:outline-none focus:border-blue-800"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label
          className="flex flex-col gap-[1px] text-blue-950"
          htmlFor="content"
        >
          Content
          <textarea
            className="border-2 border-gray-400 h-32 rounded-md pl-2 focus:outline-none focus:border-blue-800"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button
          className="bg-blue-800 cursor-pointer text-white h-11 rounded-md"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Home;
