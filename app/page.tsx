"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Habit = {
  text: string;
  done: boolean;
  doneAt?: string; // fecha cuando se completó
};

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  // Cargar hábitos desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  // Guardar hábitos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Agregar nuevo hábito
  const addHabit = () => {
    if (newHabit.trim() === "") return;
    setHabits([...habits, { text: newHabit, done: false }]);
    setNewHabit("");
  };

  // Marcar o desmarcar hábito
  const toggleHabit = (index: number) => {
    const updated = habits.map((h, i) => {
      if (i === index) {
        const newDone = !h.done;
        return {
          ...h,
          done: newDone,
          doneAt: newDone ? new Date().toISOString().slice(0, 10) : undefined,
        };
      }
      return h;
    });
    setHabits(updated);
  };

  // Borrar todos los hábitos
  const clearHabits = () => {
    setHabits([]);
    localStorage.removeItem("habits");
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Mis Hábitos</h1>

      <Link
        href="/progreso"
        className="text-blue-600 underline mb-6 inline-block"
      >
        Ver progreso →
      </Link>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Nuevo hábito..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button
          onClick={addHabit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
        <button
          onClick={clearHabits}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Borrar todos
        </button>
      </div>

      <ul className="space-y-2">
        {habits.map((habit, index) => (
          <li
            key={index}
            className={`bg-white p-3 rounded shadow flex justify-between items-center ${
              habit.done ? "opacity-60 line-through" : ""
            }`}
          >
            <span>{habit.text}</span>
            <input
              type="checkbox"
              checked={habit.done}
              onChange={() => toggleHabit(index)}
              className="w-5 h-5"
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
