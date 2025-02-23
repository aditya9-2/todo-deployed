/* eslint-disable react-hooks/exhaustive-deps */
import TodoCard from "../../components/Cards/TodoCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditTodos from "./AddEditTodos";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/ToastMessage/Toast";
import EmpltyCard from "../../components/EmptyCard/EmpltyCard";
import emptyNote from "../../assets/images/empty-note.svg";
import noNoteImg from "../../assets/images/no-note.svg";
import axios from "axios";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessageFunction = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/get-all-notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data.allNotes)) {
        setAllNotes(response.data.allNotes);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      console.log(`an unespected error accurred: ${error}`);
    }
  };

  const deleteTodo = async (data) => {
    const noteId = data._id;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users/delete-note/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && !response.data.error) {
        showToastMessageFunction("Todo deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/search-notes`,
        {
          params: { query },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (todoData) => {
    const noteId = todoData._id;
    const newPinnedState = !todoData.isPinned;

    try {
      const token = localStorage.getItem("token");
      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, isPinned: newPinnedState } : note
        )
      );

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/update-note-pinned/${noteId}`,
        {
          isPinned: newPinnedState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.note) {
        showToastMessageFunction("Todo edited Successfully", "edit");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      {userInfo && (
        <Navbar
          userInfo={userInfo}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      )}

      <div className="container mx-auto max-w-7xl">
        {/* Conditionally apply the grid-cols-3 class based on the length of allNotes */}
        <div
          className={`grid gap-4 mt-8 ${
            allNotes.length > 0 ? "grid-cols-3" : ""
          }`}
        >
          {allNotes.length > 0 ? (
            allNotes.map((item) => (
              <TodoCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteTodo(item)}
                onPinTodo={() => updateIsPinned(item)}
              />
            ))
          ) : (
            <EmpltyCard
              imgSrc={isSearch ? noNoteImg : emptyNote}
              message={
                isSearch
                  ? `Oops! No todo found matching your search`
                  : `Start creating your first Todo note! Click the 'add' button to jot down your ideas, thoughts, and reminders. Let's start a manageable journey of your life!`
              }
            />
          )}
        </div>
      </div>

      <button
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLable=""
        className="w-[40%] max-h-3/4 bg-white mx-auto mt-16 p-5 overflow-scrol rounded-md"
      >
        <AddEditTodos
          type={openAddEditModal.type}
          todoData={openAddEditModal.data}
          onclose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", date: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessageFunction={showToastMessageFunction}
        />
      </Modal>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
