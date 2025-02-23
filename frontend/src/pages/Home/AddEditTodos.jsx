/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

const AddEditTodos = ({
  todoData,
  type,
  getAllNotes,
  onclose,
  showToastMessageFunction,
}) => {
  const [title, setTitle] = useState(todoData?.title || "");
  const [content, setContent] = useState(todoData?.content || "");
  const [error, setError] = useState(null);

  const addNewTodo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/add-note`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.note) {
        showToastMessageFunction("Todo Added Successfully", "add");
        getAllNotes();
        onclose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const editTodo = async () => {
    const noteId = todoData._id;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/edit-note/${noteId}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.note) {
        showToastMessageFunction("Todo edited Successfully", "edit");
        getAllNotes();
        onclose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleAddTodo = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please add description");
      return;
    }

    setError("");

    if (type === "edit") {
      editTodo();
    } else {
      addNewTodo();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-50"
        onClick={onclose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-lable">TITLE</label>

        <input
          type="text"
          className="text-xl text-slate-950 outline-none"
          placeholder="Add title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-lable">CONTENT</label>

        <textarea
          type="text"
          className="text-xl text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Add description"
          rows={5}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddTodo}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditTodos;
