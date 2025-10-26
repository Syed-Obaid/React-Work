// import React from "react";

// const Todos = () => {
//     const [todos, setTodos] = React.useState([]);
//     const [inpValue, setInpValue] = React.useState("");
//     const [query, setQuery] = React.useState("");
//     const [filter, setFilter] = React.useState("all");
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = React.useState(null);
//     const [editingTodo, setEditingTodo] = React.useState(null);
//     const [saving, setSaving] = React.useState(false);

//     async function fetchTodos() {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch("http://localhost:3000/todos");
//             if (!response.ok) throw new Error("Network error");
//             const data = await response.json();
//             setTodos(Array.isArray(data) ? data : []);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     React.useEffect(() => {
//         fetchTodos();
//     }, []);

//     async function addTodo() {
//         const trimmed = inpValue.trim();
//         if (!trimmed) return;
//         setSaving(true);
//         try {
//             const body = { id: Date.now(), task: trimmed, complete: false };
//             const response = await fetch("http://localhost:3000/todos", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body),
//             });
//             if (!response.ok) throw new Error("Failed to add todo");
//             const newTodo = await response.json();
//             setTodos((p) => [...p, newTodo]);
//             setInpValue("");
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setSaving(false);
//         }
//     }

//     async function deleteTodo(id) {
//         if (!confirm("Delete this task?")) return;
//         try {
//             const res = await fetch(`http://localhost:3000/todos/${id}`, {
//                 method: "DELETE",
//             });
//             if (!res.ok) throw new Error("Failed to delete");
//             setTodos((prev) => prev.filter((t) => t.id !== id));
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     async function updateTodo() {
//         if (!editingTodo || !editingTodo.task.trim()) return;
//         setSaving(true);
//         try {
//             const response = await fetch(`http://localhost:3000/todos/${editingTodo.id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ task: editingTodo.task }),
//             });
//             if (!response.ok) throw new Error("Update failed");
//             const updated = await response.json();
//             setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
//             closeEditModal();
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setSaving(false);
//         }
//     }

//     async function toggleComplete(id) {
//         const todo = todos.find((t) => t.id === id);
//         if (!todo) return;
//         try {
//             const res = await fetch(`http://localhost:3000/todos/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ complete: !todo.complete }),
//             });
//             const updated = await res.json();
//             setTodos((p) =>
//                 p.map((t) => (t.id === updated.id ? { ...t, complete: updated.complete } : t))
//             );
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     function openEditModal(todo) {
//         setEditingTodo({ id: todo.id, task: todo.task });
//     }

//     function closeEditModal() {
//         setEditingTodo(null);
//     }

//     const filtered = todos
//         .filter((t) => t.task.toLowerCase().includes(query.trim().toLowerCase()))
//         .filter((t) =>
//             filter === "all" ? true : filter === "active" ? !t.complete : t.complete
//         )
//         .sort((a, b) => Number(a.complete) - Number(b.complete) || b.id - a.id);

//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex justify-center py-12 px-4 transition-all">
//             <div className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-2xl p-6 sm:p-8">
//                 <header className="mb-8">
//                     <div className="flex items-center justify-between mb-5">
//                         <div className="flex items-center gap-4">
//                             <div className="bg-gradient-to-br from-purple-600 to-indigo-500 p-3 rounded-lg shadow-lg">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11" />
//                                 </svg>
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold">Dark Pro Tasks 🌙</h1>
//                                 <p className="text-sm text-gray-400">Focus. Execute. Win.</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={fetchTodos}
//                             className="px-3 py-1.5 text-xs rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
//                         >
//                             🔄 Refresh
//                         </button>
//                     </div>

//                     <div className="text-sm text-gray-400">
//                         {todos.length} total &middot; {todos.filter((t) => !t.complete).length} active
//                     </div>
//                 </header>

//                 <div className="grid sm:grid-cols-3 gap-4 mb-6">
//                     <div className="sm:col-span-2 flex bg-gray-700 rounded-lg overflow-hidden">
//                         <input
//                             value={inpValue}
//                             onChange={(e) => setInpValue(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && addTodo()}
//                             className="flex-1 px-4 py-2 bg-transparent placeholder-gray-400 text-white focus:outline-none"
//                             placeholder="✍️ Add a task"
//                         />
//                         <button
//                             onClick={addTodo}
//                             disabled={saving}
//                             className="bg-indigo-600 px-5 py-2 hover:bg-indigo-700 transition text-white"
//                         >
//                             + Add
//                         </button>
//                     </div>

//                     <div className="flex items-center gap-2">
//                         <input
//                             className="flex-1 px-3 py-2 rounded-md bg-gray-700 placeholder:text-gray-400 text-white"
//                             placeholder="🔍 Search"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                         />
//                         <select
//                             value={filter}
//                             onChange={(e) => setFilter(e.target.value)}
//                             className="px-3 py-2 rounded-md bg-gray-700 text-white"
//                         >
//                             <option value="all">All</option>
//                             <option value="active">Active</option>
//                             <option value="completed">Completed</option>
//                         </select>
//                     </div>
//                 </div>

//                 <main>
//                     {loading ? (
//                         <div className="text-center py-16 text-gray-400 animate-pulse">
//                             Loading tasks...
//                         </div>
//                     ) : error ? (
//                         <div className="text-red-400 text-center">{error}</div>
//                     ) : filtered.length === 0 ? (
//                         <div className="text-gray-500 text-center py-12">
//                             No tasks found. Add your first one!
//                         </div>
//                     ) : (
//                         <ul className="space-y-3">
//                             {filtered.map((todo) => (
//                                 <li
//                                     key={todo.id}
//                                     className="bg-gray-800 border border-gray-700 rounded-xl flex justify-between items-center p-4 hover:shadow-lg transition"
//                                 >
//                                     <label className="flex items-center gap-3 cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             checked={todo.complete}
//                                             onChange={() => toggleComplete(todo.id)}
//                                             className="w-5 h-5 accent-indigo-500"
//                                         />
//                                         <div>
//                                             <div className={`text-sm ${todo.complete ? "line-through text-gray-500" : "text-white"}`}>
//                                                 {todo.task}
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-0.5">
//                                                 #{todo.id} · {todo.complete ? "✓ Completed" : "Active"}
//                                             </div>
//                                         </div>
//                                     </label>

//                                     <div className="flex gap-2">
//                                         <button
//                                             onClick={() => openEditModal(todo)}
//                                             className="bg-amber-600 hover:bg-amber-700 px-3 py-1 text-xs rounded text-white"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => deleteTodo(todo.id)}
//                                             className="bg-red-600 hover:bg-red-700 px-3 py-1 text-xs rounded text-white"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </main>

//                 <footer className="mt-6 text-xs text-gray-500 text-center">
//                     Tip: Use Enter ↩ to save. Esc to cancel.
//                 </footer>
//             </div>

//             {/* Edit Modal */}
//             {editingTodo && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity animate-fade-in">
//                     <div className="bg-gray-800 shadow-xl rounded-xl p-6 w-full max-w-md">
//                         <h3 className="text-lg font-semibold text-white mb-4">Edit Task</h3>
//                         <input
//                             value={editingTodo.task}
//                             onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") updateTodo();
//                                 if (e.key === "Escape") closeEditModal();
//                             }}
//                             autoFocus
//                             className="w-full px-4 py-2 rounded-md bg-gray-700 text-white mb-4 outline-none"
//                         />
//                         <div className="text-right space-x-3">
//                             <button
//                                 onClick={closeEditModal}
//                                 className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-500"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={updateTodo}
//                                 disabled={saving}
//                                 className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <style>{`
//                 .animate-fade-in {
//                     animation: fadeIn 0.3s ease-out;
//                 }
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: scale(0.95); }
//                     to { opacity: 1; transform: scale(1); }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Todos;




// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Todos = () => {
//     const [todos, setTodos] = React.useState([]);
//     const [inpValue, setInpValue] = React.useState("");
//     const [query, setQuery] = React.useState("");
//     const [filter, setFilter] = React.useState("all");
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = React.useState(null);
//     const [editingTodo, setEditingTodo] = React.useState(null);
//     const [saving, setSaving] = React.useState(false);

//     // Missing: Filtered todos calculation
//     const filtered = todos
//         .filter((t) => t.task.toLowerCase().includes(query.trim().toLowerCase()))
//         .filter((t) => 
//             filter === "all" ? true : 
//             filter === "active" ? !t.complete : 
//             t.complete
//         )
//         .sort((a, b) => Number(a.complete) - Number(b.complete) || b.id - a.id);

//     // Missing: useEffect to load initial data
//     React.useEffect(() => {
//         fetchTodos();
//     }, []);

//     // Missing: Modal handler functions
//     function openEditModal(todo) {
//         setEditingTodo({ id: todo.id, task: todo.task });
//     }

//     function closeEditModal() {
//         setEditingTodo(null);
//     }

//     async function fetchTodos() {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch("http://localhost:3000/todos");
//             if (!response.ok) throw new Error("Network error");
//             const data = await response.json();
//             setTodos(Array.isArray(data) ? data : []);
//             toast.success("Tasks loaded successfully!");
//         } catch (err) {
//             setError(err.message);
//             toast.error("Failed to load tasks");
//         } finally {
//             setLoading(false);
//         }
//     }

//     async function addTodo() {
//         const trimmed = inpValue.trim();
//         if (!trimmed) return;
//         setSaving(true);
//         try {
//             const body = { id: Date.now(), task: trimmed, complete: false };
//             const response = await fetch("http://localhost:3000/todos", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body),
//             });
//             if (!response.ok) throw new Error("Failed to add todo");
//             const newTodo = await response.json();
//             setTodos((p) => [...p, newTodo]);
//             setInpValue("");
//             toast.success("Task added successfully!");
//         } catch (err) {
//             toast.error("Failed to add task");
//             console.error(err);
//         } finally {
//             setSaving(false);
//         }
//     }

//     async function deleteTodo(id) {
//         if (!confirm("Delete this task?")) return;
//         try {
//             const res = await fetch(`http://localhost:3000/todos/${id}`, {
//                 method: "DELETE",
//             });
//             if (!res.ok) throw new Error("Failed to delete");
//             setTodos((prev) => prev.filter((t) => t.id !== id));
//             toast.success("Task deleted successfully!");
//         } catch (err) {
//             toast.error("Failed to delete task");
//             console.error(err);
//         }
//     }

//     async function updateTodo() {
//         if (!editingTodo || !editingTodo.task.trim()) return;
//         setSaving(true);
//         try {
//             const response = await fetch(`http://localhost:3000/todos/${editingTodo.id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ task: editingTodo.task }),
//             });
//             if (!response.ok) throw new Error("Update failed");
//             const updated = await response.json();
//             setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
//             closeEditModal();
//             toast.success("Task updated successfully!");
//         } catch (err) {
//             toast.error("Failed to update task");
//             console.error(err);
//         } finally {
//             setSaving(false);
//         }
//     }

//     async function toggleComplete(id) {
//         const todo = todos.find((t) => t.id === id);
//         if (!todo) return;
//         try {
//             const res = await fetch(`http://localhost:3000/todos/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ complete: !todo.complete }),
//             });
//             const updated = await res.json();
//             setTodos((p) =>
//                 p.map((t) => (t.id === updated.id ? { ...t, complete: updated.complete } : t))
//             );
//             toast.info(todo.complete ? "Task marked as active" : "Task completed!");
//         } catch (err) {
//             toast.error("Failed to update task status");
//             console.error(err);
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8 px-4 transition-all duration-200">
//             <ToastContainer position="top-right" theme="colored" />
            
//             <div className="max-w-4xl mx-auto">
//                 {/* Header Section */}
//                 <header className="mb-8">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                             <div className="bg-gradient-to-br from-blue-500 to-teal-400 p-4 rounded-xl shadow-lg">
//                                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M5 6h.01M19 6h.01M5 12h.01M19 12h.01M5 18h.01M19 18h.01M6.001 6.0001C5.49 6.00055 5 6.49 5 7.00005V18C5 18.5104 5.49 19 6 19H18C18.51 19 19 18.51 19 18V7C19 6.49 18.51 6 18 6H6.001z" />
//                                 </svg>
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
//                                     Pro Tasks
//                                 </h1>
//                                 <p className="text-sm text-gray-400 mt-1">Organize your day, achieve more</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={fetchTodos}
//                             className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-lg flex items-center justify-center gap-2"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m21.09 0H20v5m0 5H.582m21.09 0H20V20m0-5H.582m21.09 0H20V5m0 5H.582m21.09 0H20zM4 20h16" />
//                             </svg>
//                             Refresh
//                         </button>
//                     </div>

//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
//                         <div className="text-sm text-gray-400">
//                             {todos.length} tasks &middot; {todos.filter((t) => !t.complete).length} active
//                         </div>
//                         <div className="flex gap-2">
//                             <input
//                                 className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="🔍 Search tasks..."
//                                 value={query}
//                                 onChange={(e) => setQuery(e.target.value)}
//                             />
//                             <select
//                                 value={filter}
//                                 onChange={(e) => setFilter(e.target.value)}
//                                 className="px-4 py-2 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="all">All</option>
//                                 <option value="active">Active</option>
//                                 <option value="completed">Completed</option>
//                             </select>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Task Input Section */}
//                 <div className="grid gap-4">
//                     <div className="flex gap-4 flex-col sm:flex-row">
//                         <div className="flex-1 relative">
//                             <input
//                                 value={inpValue}
//                                 onChange={(e) => setInpValue(e.target.value)}
//                                 onKeyDown={(e) => e.key === "Enter" && addTodo()}
//                                 className="w-full px-5 py-3 rounded-lg bg-gray-800/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="📝 Add a new task..."
//                             />
//                         </div>
//                         <button
//                             onClick={addTodo}
//                             disabled={saving}
//                             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
//                         >
//                             {saving ? (
//                                 <>
//                                     <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
//                                     Adding...
//                                 </>
//                             ) : (
//                                 "Add Task"
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Task List Section */}
//                 <main className="mt-8">
//                     {loading ? (
//                         <div className="text-center py-12">
//                             <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent text-blue-500"></div>
//                             <p className="mt-4 text-gray-400">Loading tasks...</p>
//                         </div>
//                     ) : error ? (
//                         <div className="text-red-400 text-center py-12 bg-red-900/20 rounded-xl p-6">
//                             <p className="text-xl font-semibold">Error</p>
//                             <p>{error}</p>
//                             <button onClick={fetchTodos} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
//                                 Retry
//                             </button>
//                         </div>
//                     ) : filtered.length === 0 ? (
//                         <div className="text-center py-12 bg-gray-800/20 rounded-xl">
//                             <p className="text-gray-500 text-lg">No tasks found</p>
//                             <p className="text-sm text-gray-400 mt-2">Create your first task to get started!</p>
//                         </div>
//                     ) : (
//                         <ul className="space-y-3">
//                             {filtered.map((todo) => (
//                                 <li
//                                     key={todo.id}
//                                     className="bg-gray-800/50 border border-gray-700 rounded-xl flex justify-between items-center p-4 hover:border-blue-500 transition-all duration-200 group"
//                                 >
//                                     <label className="flex items-center gap-4 cursor-pointer flex-1">
//                                         <input
//                                             type="checkbox"
//                                             checked={todo.complete}
//                                             onChange={() => toggleComplete(todo.id)}
//                                             className="w-6 h-6 accent-blue-500 rounded-full"
//                                         />
//                                         <div>
//                                             <div className={`text-sm ${todo.complete ? "line-through text-gray-500" : "text-white"}`}>
//                                                 {todo.task}
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-1">
//                                                 ID: {todo.id} • {todo.complete ? "Completed" : "Active"}
//                                             </div>
//                                         </div>
//                                     </label>

//                                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                         <button
//                                             onClick={() => openEditModal(todo)}
//                                             className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm transition-colors"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => deleteTodo(todo.id)}
//                                             className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </main>

//                 {/* Edit Modal */}
//                 {editingTodo && (
//                     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
//                         <div className="bg-gray-800 shadow-2xl rounded-xl p-6 w-full max-w-md">
//                             <h3 className="text-lg font-semibold text-white mb-4">Edit Task</h3>
//                             <input
//                                 value={editingTodo.task}
//                                 onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter") updateTodo();
//                                     if (e.key === "Escape") closeEditModal();
//                                 }}
//                                 autoFocus
//                                 className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Enter new task..."
//                             />
//                             <div className="flex justify-end gap-3">
//                                 <button
//                                     onClick={closeEditModal}
//                                     className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={updateTodo}
//                                     disabled={saving}
//                                     className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
//                                 >
//                                     {saving ? (
//                                         <>
//                                             <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
//                                             Saving...
//                                         </>
//                                     ) : (
//                                         "Save Changes"
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: scale(0.95); }
//                     to { opacity: 1; transform: scale(1); }
//                 }
//                 .animate-fade-in {
//                     animation: fadeIn 0.3s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Todos;




// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Todos = () => {
//     // State Variables (Jab bhi koi change hoga, component re-render hoga)
//     const [todos, setTodos] = React.useState([]); // Tasks ka data
//     const [inpValue, setInpValue] = React.useState(""); // Input field ka value
//     const [query, setQuery] = React.useState(""); // Search query
//     const [filter, setFilter] = React.useState("all"); // Filter (all, active, completed)
//     const [loading, setLoading] = React.useState(false); // Loading state
//     const [error, setError] = React.useState(null); // Error handling
//     const [editingTodo, setEditingTodo] = React.useState(null); // Edit modal ka data
//     const [saving, setSaving] = React.useState(false); // Save button loading

//     // 👇 Ye ref useEffect ko sirf 1 baar chalane ke liye (React Strict Mode problem solve)
//     const hasFetched = React.useRef(false);

//     // Filtered Tasks (Search + Filter ke hisab se)
//     const filtered = todos
//         .filter((t) => t.task.toLowerCase().includes(query.trim().toLowerCase())) // Search
//         .filter((t) => 
//             filter === "all" ? true : 
//             filter === "active" ? !t.complete : 
//             t.complete
//         ) // Filter (Active/Completed)
//         .sort((a, b) => Number(a.complete) - Number(b.complete) || b.id - a.id); // Sort

//     // 👇 useEffect: Component mount hone par data load karo (sirf 1 baar)
//     React.useEffect(() => {
//         if (!hasFetched.current) {
//             fetchTodos(); // API se data fetch karo
//             hasFetched.current = true; // Ab agla baar nahi chalega
//         }
//     }, []);

//     // Modal ke liye functions
//     function openEditModal(todo) {
//         setEditingTodo({ id: todo.id, task: todo.task });
//     }

//     function closeEditModal() {
//         setEditingTodo(null);
//     }

//     // API: Tasks fetch karna
//     async function fetchTodos() {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch("http://localhost:3000/todos");
//             if (!response.ok) throw new Error("Network error");
//             const data = await response.json();
//             setTodos(Array.isArray(data) ? data : []);
//             toast.success("Tasks loaded successfully!"); // 👇 Ye sirf 1 baar show hoga
//         } catch (err) {
//             setError(err.message);
//             toast.error("Failed to load tasks");
//         } finally {
//             setLoading(false);
//         }
//     }

//     // API: New task add karna
//     async function addTodo() {
//         const trimmed = inpValue.trim();
//         if (!trimmed) return;
//         setSaving(true);
//         try {
//             const body = { id: Date.now(), task: trimmed, complete: false };
//             const response = await fetch("http://localhost:3000/todos", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body),
//             });
//             if (!response.ok) throw new Error("Failed to add todo");
//             const newTodo = await response.json();
//             setTodos((p) => [...p, newTodo]);
//             setInpValue("");
//             toast.success("Task added successfully!");
//         } catch (err) {
//             toast.error("Failed to add task");
//             console.error(err);
//         } finally {
//             setSaving(false);
//         }
//     }

//     // API: Task delete karna
//     async function deleteTodo(id) {
//         if (!confirm("Delete this task?")) return;
//         try {
//             const res = await fetch(`http://localhost:3000/todos/${id}`, {
//                 method: "DELETE",
//             });
//             if (!res.ok) throw new Error("Failed to delete");
//             setTodos((prev) => prev.filter((t) => t.id !== id));
//             toast.success("Task deleted successfully!");
//         } catch (err) {
//             toast.error("Failed to delete task");
//             console.error(err);
//         }
//     }

//     // API: Task edit karna
//     async function updateTodo() {
//         if (!editingTodo || !editingTodo.task.trim()) return;
//         setSaving(true);
//         try {
//             const response = await fetch(`http://localhost:3000/todos/${editingTodo.id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ task: editingTodo.task }),
//             });
//             if (!response.ok) throw new Error("Update failed");
//             const updated = await response.json();
//             setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
//             closeEditModal();
//             toast.success("Task updated successfully!");
//         } catch (err) {
//             toast.error("Failed to update task");
//             console.error(err);
//         } finally {
//             setSaving(false);
//         }
//     }

//     // API: Task complete toggle karna
//     async function toggleComplete(id) {
//         const todo = todos.find((t) => t.id === id);
//         if (!todo) return;
//         try {
//             const res = await fetch(`http://localhost:3000/todos/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ complete: !todo.complete }),
//             });
//             const updated = await res.json();
//             setTodos((p) =>
//                 p.map((t) => (t.id === updated.id ? { ...t, complete: updated.complete } : t))
//             );
//             toast.info(todo.complete ? "Task marked as active" : "Task completed!");
//         } catch (err) {
//             toast.error("Failed to update task status");
//             console.error(err);
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-8 px-4 transition-all duration-200">
//             <ToastContainer position="top-right" theme="colored" autoClose={2000} /> {/* 👇 Toaster 2 sec baad khud band ho jayega */}
            
//             <div className="max-w-4xl mx-auto">
//                 {/* Header Section */}
//                 <header className="mb-8">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div className="flex items-center gap-4">
//                             <div className="bg-gradient-to-br from-blue-500 to-teal-400 p-4 rounded-xl shadow-lg">
//                                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M5 6h.01M19 6h.01M5 12h.01M19 12h.01M5 18h.01M19 18h.01M6.001 6.0001C5.49 6.00055 5 6.49 5 7.00005V18C5 18.5104 5.49 19 6 19H18C18.51 19 19 18.51 19 18V7C19 6.49 18.51 6 18 6H6.001z" />
//                                 </svg>
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
//                                     Pro Tasks
//                                 </h1>
//                                 <p className="text-sm text-gray-400 mt-1">Organize your day, achieve more</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={fetchTodos}
//                             className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-lg flex items-center justify-center gap-2"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m21.09 0H20v5m0 5H.582m21.09 0H20V20m0-5H.582m21.09 0H20V5m0 5H.582m21.09 0H20zM4 20h16" />
//                             </svg>
//                             Refresh
//                         </button>
//                     </div>

//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
//                         <div className="text-sm text-gray-400">
//                             {todos.length} tasks &middot; {todos.filter((t) => !t.complete).length} active
//                         </div>
//                         <div className="flex gap-2">
//                             <input
//                                 className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="🔍 Search tasks..."
//                                 value={query}
//                                 onChange={(e) => setQuery(e.target.value)}
//                             />
//                             <select
//                                 value={filter}
//                                 onChange={(e) => setFilter(e.target.value)}
//                                 className="px-4 py-2 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="all">All</option>
//                                 <option value="active">Active</option>
//                                 <option value="completed">Completed</option>
//                             </select>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Task Input Section */}
//                 <div className="grid gap-4">
//                     <div className="flex gap-4 flex-col sm:flex-row">
//                         <div className="flex-1 relative">
//                             <input
//                                 value={inpValue}
//                                 onChange={(e) => setInpValue(e.target.value)}
//                                 onKeyDown={(e) => e.key === "Enter" && addTodo()}
//                                 className="w-full px-5 py-3 rounded-lg bg-gray-800/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="📝 Add a new task..."
//                             />
//                         </div>
//                         <button
//                             onClick={addTodo}
//                             disabled={saving}
//                             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
//                         >
//                             {saving ? (
//                                 <>
//                                     <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
//                                     Adding...
//                                 </>
//                             ) : (
//                                 "Add Task"
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Task List Section */}
//                 <main className="mt-8">
//                     {loading ? (
//                         <div className="text-center py-12">
//                             <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent text-blue-500"></div>
//                             <p className="mt-4 text-gray-400">Loading tasks...</p>
//                         </div>
//                     ) : error ? (
//                         <div className="text-red-400 text-center py-12 bg-red-900/20 rounded-xl p-6">
//                             <p className="text-xl font-semibold">Error</p>
//                             <p>{error}</p>
//                             <button onClick={fetchTodos} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
//                                 Retry
//                             </button>
//                         </div>
//                     ) : filtered.length === 0 ? (
//                         <div className="text-center py-12 bg-gray-800/20 rounded-xl">
//                             <p className="text-gray-500 text-lg">No tasks found</p>
//                             <p className="text-sm text-gray-400 mt-2">Create your first task to get started!</p>
//                         </div>
//                     ) : (
//                         <ul className="space-y-3">
//                             {filtered.map((todo) => (
//                                 <li
//                                     key={todo.id}
//                                     className="bg-gray-800/50 border border-gray-700 rounded-xl flex justify-between items-center p-4 hover:border-blue-500 transition-all duration-200 group"
//                                 >
//                                     <label className="flex items-center gap-4 cursor-pointer flex-1">
//                                         <input
//                                             type="checkbox"
//                                             checked={todo.complete}
//                                             onChange={() => toggleComplete(todo.id)}
//                                             className="w-6 h-6 accent-blue-500 rounded-full"
//                                         />
//                                         <div>
//                                             <div className={`text-sm ${todo.complete ? "line-through text-gray-500" : "text-white"}`}>
//                                                 {todo.task}
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-1">
//                                                 ID: {todo.id} • {todo.complete ? "Completed" : "Active"}
//                                             </div>
//                                         </div>
//                                     </label>

//                                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                         <button
//                                             onClick={() => openEditModal(todo)}
//                                             className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm transition-colors"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => deleteTodo(todo.id)}
//                                             className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </main>

//                 {/* Edit Modal */}
//                 {editingTodo && (
//                     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
//                         <div className="bg-gray-800 shadow-2xl rounded-xl p-6 w-full max-w-md">
//                             <h3 className="text-lg font-semibold text-white mb-4">Edit Task</h3>
//                             <input
//                                 value={editingTodo.task}
//                                 onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter") updateTodo();
//                                     if (e.key === "Escape") closeEditModal();
//                                 }}
//                                 autoFocus
//                                 className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Enter new task..."
//                             />
//                             <div className="flex justify-end gap-3">
//                                 <button
//                                     onClick={closeEditModal}
//                                     className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={updateTodo}
//                                     disabled={saving}
//                                     className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
//                                 >
//                                     {saving ? (
//                                         <>
//                                             <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
//                                             Saving...
//                                         </>
//                                     ) : (
//                                         "Save Changes"
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: scale(0.95); }
//                     to { opacity: 1; transform: scale(1); }
//                 }
//                 .animate-fade-in {
//                     animation: fadeIn 0.3s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Todos;






import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todos = () => {
    // State Variables (Jab bhi koi change hoga, component re-render hoga)
    const [todos, setTodos] = React.useState([]); // Tasks ka data
    const [inpValue, setInpValue] = React.useState(""); // Input field ka value
    const [query, setQuery] = React.useState(""); // Search query
    const [filter, setFilter] = React.useState("all"); // Filter (all, active, completed)
    const [loading, setLoading] = React.useState(false); // Loading state
    const [error, setError] = React.useState(null); // Error handling
    const [editingTodo, setEditingTodo] = React.useState(null); // Edit modal ka data
    const [saving, setSaving] = React.useState(false); // Save button loading

    // 👇 Ye ref useEffect ko sirf 1 baar chalane ke liye (React Strict Mode problem solve)
    const hasFetched = React.useRef(false);

    // Filtered Tasks (Search + Filter ke hisab se)
    const filtered = todos
        .filter((t) => t.task.toLowerCase().includes(query.trim().toLowerCase())) // Search
        .filter((t) =>
            filter === "all" ? true :
            filter === "active" ? !t.complete :
            t.complete
        ) // Filter (Active/Completed)
        .sort((a, b) => Number(a.complete) - Number(b.complete) || b.id - a.id); // Sort

    // 👇 useEffect: Component mount hone par data load karo (sirf 1 baar)
    React.useEffect(() => {
        if (!hasFetched.current) {
            fetchTodos(); // API se data fetch karo
            hasFetched.current = true; // Ab agla baar nahi chalega
        }
    }, []);

    // Modal ke liye functions
    function openEditModal(todo) {
        setEditingTodo({ id: todo.id, task: todo.task });
    }

    function closeEditModal() {
        setEditingTodo(null);
    }

    // API: Tasks fetch karna
    async function fetchTodos() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/todos");
            if (!response.ok) throw new Error("Network error or server down");
            const data = await response.json();
            setTodos(Array.isArray(data) ? data : []);
            toast.success("Tasks loaded successfully!");
        } catch (err) {
            setError(err.message);
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }

    // API: New task add karna
    async function addTodo() {
        const trimmed = inpValue.trim();
        if (!trimmed) {
            toast.warn("Task cannot be empty!");
            return;
        }
        setSaving(true);
        try {
            const body = { id: Date.now(), task: trimmed, complete: false };
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error("Failed to add todo");
            const newTodo = await response.json();
            setTodos((p) => [...p, newTodo]);
            setInpValue("");
            toast.success("Task added successfully!");
        } catch (err) {
            toast.error("Failed to add task");
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    // API: Task delete karna
    async function deleteTodo(id) {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            const res = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            setTodos((prev) => prev.filter((t) => t.id !== id));
            toast.success("Task deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete task");
            console.error(err);
        }
    }

    // API: Task edit karna
    async function updateTodo() {
        if (!editingTodo || !editingTodo.task.trim()) {
            toast.warn("Task cannot be empty!");
            return;
        }
        setSaving(true);
        try {
            const response = await fetch(`http://localhost:3000/todos/${editingTodo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: editingTodo.task }), // Only update 'task' property
            });
            if (!response.ok) throw new Error("Update failed");
            const updated = await response.json();
            setTodos((prev) => prev.map((t) => (t.id === updated.id ? { ...t, task: updated.task } : t))); // Update only the task property
            closeEditModal();
            toast.success("Task updated successfully!");
        } catch (err) {
            toast.error("Failed to update task");
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    // API: Task complete toggle karna
    async function toggleComplete(id) {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        try {
            const res = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ complete: !todo.complete }),
            });
            const updated = await res.json();
            setTodos((p) =>
                p.map((t) => (t.id === updated.id ? { ...t, complete: updated.complete } : t))
            );
            toast.info(todo.complete ? "Task marked as active" : "Task completed!");
        } catch (err) {
            toast.error("Failed to update task status");
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-10 px-4 transition-all duration-200">
            <ToastContainer position="top-right" theme="colored" autoClose={2500} /> {/* AutoClose increased slightly */}

            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <header className="mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-blue-600 to-teal-500 p-4 rounded-xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M5 6h.01M19 6h.01M5 12h.01M19 12h.01M5 18h.01M19 18h.01M6.001 6.0001C5.49 6.00055 5 6.49 5 7.00005V18C5 18.5104 5.49 19 6 19H18C18.51 19 19 18.51 19 18V7C19 6.49 18.51 6 18 6H6.001z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"> {/* Increased font size */}
                                    Pro Tasks
                                </h1>
                                <p className="text-base text-gray-400 mt-1">Organize your day, achieve more</p> {/* Increased font size */}
                            </div>
                        </div>
                        <button
                            onClick={fetchTodos}
                            className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-md flex items-center justify-center gap-2 text-base" // Adjusted padding and shadow
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m21.09 0H20v5m0 5H.582m21.09 0H20V20m0-5H.582m21.09 0H20V5m0 5H.582m21.09 0H20zM4 20h16" />
                            </svg>
                            Refresh
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4"> {/* Increased gap and margin-top */}
                        <div className="text-base text-gray-400"> {/* Increased font size */}
                            <span className="font-semibold text-white">{todos.length}</span> tasks &middot; <span className="font-semibold text-white">{todos.filter((t) => !t.complete).length}</span> active
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto"> {/* Added full width on small screens */}
                            <input
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 placeholder-gray-500 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500" // text-base
                                placeholder="🔍 Search tasks..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 rounded-lg bg-gray-800/50 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500" // text-base
                            >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </header>

                {/* Task Input Section */}
                <div className="grid gap-4 mb-10"> {/* Increased margin-bottom */}
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <div className="flex-1 relative">
                            <input
                                value={inpValue}
                                onChange={(e) => setInpValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                                className="w-full px-5 py-3 rounded-lg bg-gray-800/50 placeholder-gray-500 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500" // text-base
                                placeholder="📝 Add a new task..."
                            />
                        </div>
                        <button
                            onClick={addTodo}
                            disabled={saving}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-md flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed" // Added shadow, text-base, and disabled styles
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                    Adding...
                                </>
                            ) : (
                                "Add Task"
                            )}
                        </button>
                    </div>
                </div>

                {/* Task List Section */}
                <main className="mt-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent text-blue-500"></div>
                            <p className="mt-4 text-gray-400 text-lg">Loading tasks...</p> {/* Increased font size */}
                        </div>
                    ) : error ? (
                        <div className="text-red-400 text-center py-12 bg-red-900/20 rounded-xl p-6 shadow-lg"> {/* Added shadow */}
                            <p className="text-2xl font-semibold mb-2">Error</p> {/* Increased font size */}
                            <p className="text-lg">{error}</p> {/* Increased font size */}
                            <button onClick={fetchTodos} className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-base shadow-md"> {/* Adjusted padding and shadow */}
                                Retry
                            </button>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-12 bg-gray-800/20 rounded-xl shadow-md"> {/* Added shadow */}
                            <p className="text-gray-500 text-xl font-medium">No tasks found</p> {/* Increased font size */}
                            <p className="text-base text-gray-400 mt-2">Create your first task to get started!</p> {/* Increased font size */}
                        </div>
                    ) : (
                        <ul className="space-y-4"> {/* Increased space between list items */}
                            {filtered.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="bg-gray-800/50 border border-gray-700 rounded-xl flex justify-between items-center p-4 hover:border-blue-500 hover:border-2 transition-all duration-200 group shadow-md" // Added shadow and border-2 on hover
                                >
                                    <label className="flex items-center gap-4 cursor-pointer flex-1">
                                        <input
                                            type="checkbox"
                                            checked={todo.complete}
                                            onChange={() => toggleComplete(todo.id)}
                                            className="w-6 h-6 accent-blue-500 rounded-full flex-shrink-0" // Added flex-shrink-0
                                        />
                                        <div>
                                            <div className={`text-lg ${todo.complete ? "line-through text-gray-500" : "text-white"}`}> {/* Increased font size */}
                                                {todo.task}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1"> {/* Increased font size */}
                                                ID: {todo.id} • {todo.complete ? "Completed" : "Active"}
                                            </div>
                                        </div>
                                    </label>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(todo)}
                                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm transition-colors shadow-sm" // Added shadow-sm
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors shadow-sm" // Added shadow-sm
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </main>

                {/* Edit Modal */}
                {editingTodo && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                        <div className="bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-md border border-gray-700"> {/* Increased padding, added border */}
                            <h3 className="text-xl font-semibold text-white mb-5">Edit Task</h3> {/* Increased font size and margin-bottom */}
                            <input
                                value={editingTodo.task}
                                onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") updateTodo();
                                    if (e.key === "Escape") closeEditModal();
                                }}
                                autoFocus
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-base text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" // text-base
                                placeholder="Enter new task..."
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={closeEditModal}
                                    className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-base transition-colors shadow-sm" // Adjusted padding and text-base
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updateTodo}
                                    disabled={saving}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm" // Adjusted padding and text-base
                                >
                                    {saving ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Todos;