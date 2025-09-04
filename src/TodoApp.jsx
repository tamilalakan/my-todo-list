// src/TodoApp.jsx
import React, { useEffect, useState } from "react";

// Helper: generate unique id
const uid = () => Math.random().toString(36).slice(2, 9);

const STORAGE_KEY = "todo_app_v1";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setTodos(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(item) {
    const newTodo = {
      id: uid(),
      text: item.text || "Untitled",
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((t) => [newTodo, ...t]);
  }

  function handleAdd(e) {
    e.preventDefault();
    const raw = text.trim();
    if (!raw) return;
    addTodo({ text: raw });
    setText("");
  }

  function toggleDone(id) {
    setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  }

  function removeTodo(id) {
    setTodos((t) => t.filter((x) => x.id !== id));
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setText(todo.text);
  }

  function saveEdit(e) {
    e.preventDefault();
    if (!editingId) return;
    setTodos((t) =>
      t.map((x) =>
        x.id === editingId ? { ...x, text: text.trim() || x.text } : x
      )
    );
    setEditingId(null);
    setText("");
  }

  function clearAll() {
    if (!confirm("Clear all todos?")) return;
    setTodos([]);
  }

  const filtered = todos.filter((t) => {
    if (filter === "active" && t.done) return false;
    if (filter === "done" && !t.done) return false;
    if (query && !t.text.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>

        <form
          onSubmit={editingId ? saveEdit : handleAdd}
          className="mb-4 flex gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            {editingId ? "Save" : "Add"}
          </button>
        </form>

        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border px-2 py-1"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>
          <input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md border px-2 py-1"
          />
          <button
            onClick={clearAll}
            className="ml-auto px-3 py-1 border rounded"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center text-slate-500">No todos yet</div>
          )}
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`p-3 rounded-md shadow-sm flex items-start gap-3 ${
                t.done
                  ? "bg-slate-100 line-through text-slate-400"
                  : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleDone(t.id)}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{t.text}</div>
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => startEdit(t)}
                      className="underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTodo(t.id)}
                      className="underline text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
