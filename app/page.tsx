"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Habit = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
};

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");

  // Cargar hábitos desde la API
  const loadHabits = async () => {
    const res = await fetch("/api/habits");
    const data = await res.json();
    setHabits(data);
  };

  useEffect(() => {
    loadHabits();
  }, []);

  // Agregar hábito
  const addHabit = async () => {
    if (!newHabit.trim()) return;

    await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newHabit,
        date: new Date().toISOString().slice(0, 10),
      }),
    });

    setNewHabit("");
    loadHabits();
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Mis Hábitos</h1>

      <Link href="/progreso" className="text-blue-600 underline mb-6 inline-block">
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
      </div>

      <ul className="space-y-2">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className={`bg-white p-3 rounded shadow flex justify-between items-center ${
              habit.completed ? "opacity-60 line-through" : ""
            }`}
          >
            <span>{habit.title}</span>
            <input
              type="checkbox"
              checked={habit.completed}
              readOnly
              className="w-5 h-5"
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
