import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./features/todoSlice";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

function App() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);

  const showSuccessAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonColor: "#06b6d4",
      iconColor: "#10b981",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const showErrorAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonColor: "#ef4444",
      iconColor: "#f43f5e",
    });
  };

  const showConfirmationAlert = (title, message) => {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      background: "#1f2937",
      color: "#f9fafb",
      showCancelButton: true,
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      iconColor: "#f59e0b",
    });
  };

  function addTodofn() {
    if (input.trim() === "") {
      showErrorAlert("Empty Task", "Please enter a task before adding!");
      return;
    }

    dispatch(addTodo({ task: input }));
    setInput("");

    showSuccessAlert("Task Added!", "Your task has been added successfully.");
  }

  async function handleDelete(id) {
    const taskToDelete = todos.find((todo) => todo.id === id);

    const result = await showConfirmationAlert(
      "Delete Task?",
      `Are you sure you want to delete "${taskToDelete?.task}"? This action cannot be undone.`
    );

    if (result.isConfirmed) {
      dispatch(deleteTodo(id));
      showSuccessAlert(
        "Task Deleted!",
        "Your task has been removed successfully."
      );
    }
  }

  function handleEdit(id, task) {
    setEditId(id);
    setEditText(task);

    Swal.fire({
      title: "Edit Mode",
      text: "You're now editing the task. Press Enter to save or Escape to cancel.",
      icon: "info",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonColor: "#06b6d4",
      iconColor: "#3b82f6",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  function saveEdit(id) {
    if (editText.trim() === "") {
      showErrorAlert("Empty Task", "Task cannot be empty!");
      return;
    }

    const originalTask = todos.find((todo) => todo.id === id)?.task;

    dispatch(editTodo({ id, newTask: editText }));
    setEditId(null);
    setEditText("");

    showSuccessAlert(
      "Task Updated!",
      `Task changed from "${originalTask}" to "${editText}"`
    );
  }

  function cancelEdit() {
    setEditId(null);
    setEditText("");

    Swal.fire({
      title: "Edit Cancelled",
      text: "Your changes were not saved.",
      icon: "info",
      background: "#1f2937",
      color: "#f9fafb",
      confirmButtonColor: "#6b7280",
      iconColor: "#9ca3af",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      if (input.trim() === "") {
        showErrorAlert("Empty Task", "Please enter a task before adding!");
        return;
      }
      addTodofn();
    }
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === "Enter") {
      if (editText.trim() === "") {
        showErrorAlert("Empty Task", "Task cannot be empty!");
        return;
      }
      saveEdit(id);
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-gray-700/50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="text-gray-400 text-sm">Stay organized and productive</p>
        </div>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
            placeholder="What needs to be done?"
            className="flex-1 p-4 rounded-2xl bg-gray-800/60 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
          />
          <button
            onClick={addTodofn}
            className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:scale-95 transition-all duration-300 rounded-2xl text-white font-semibold shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2"
          >
            <span>Add</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-gray-400 py-12"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center border border-gray-600/50">
                  <svg
                    className="w-8 h-8 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-300 mb-1">
                  No tasks yet
                </p>
                <p className="text-sm text-gray-500">
                  Add your first task to get started
                </p>
              </motion.div>
            ) : (
              todos.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  {editId === item.id ? (
                    <div className="flex items-center gap-3">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                        className="flex-1 p-3 rounded-xl bg-gray-700/50 border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-100 flex-1 break-words pr-4 text-lg font-medium">
                        {item.task}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleEdit(item.id, item.task)}
                          className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:scale-110"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-110"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 pt-4 border-t border-gray-600/30"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">
                {todos.length} {todos.length === 1 ? "task" : "tasks"}
              </span>
              <span className="text-cyan-400 font-medium">
                {todos.length > 0 ? "Keep going! 🚀" : "All done! 🎉"}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }
      `}</style>
    </div>
  );
}

export default App;
