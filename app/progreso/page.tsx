"use client";

import { useEffect, useState } from "react";

type Habit = {
  text: string;
  done: boolean;
  doneAt?: string;
};

export default function ProgresoPage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  // Resumen
  const total = habits.length;
  const done = habits.filter((h) => h.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  // Contar hábitos por día
  const counts: Record<string, number> = {};
  habits.forEach((h) => {
    if (h.done) {
      const day = h.doneAt!;
      counts[day] = (counts[day] || 0) + 1;
    }
  });

  const days = Object.keys(counts).sort();
  const max = Math.max(1, ...Object.values(counts));

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📊 Progreso</h1>

      {/* Resumen general */}
      <div className="bg-white p-6 rounded shadow max-w-md mb-8">
        <p className="text-lg mb-2">Total hábitos: {total}</p>
        <p className="text-lg mb-2">Completados: {done}</p>
        <p className="text-lg font-bold">Progreso: {percent}%</p>
        <div className="w-full bg-gray-200 h-4 rounded mt-4">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Gráfica de barras */}
      <div className="bg-white p-6 rounded shadow max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Hábitos por día</h2>

        {days.length === 0 && (
          <p className="text-gray-500">Aún no hay datos para mostrar.</p>
        )}

        <div className="flex items-end gap-4 h-48 border-t border-gray-300 p-2">
  {days.map((day) => {
    const value = counts[day];
    const heightPx = (value / max) * 150; // altura en pixeles dentro del contenedor de 150px

    return (
      <div key={day} className="flex flex-col items-center">
        <div
          className="bg-blue-500 w-8 rounded-t"
          style={{ height: `${heightPx}px` }}
          title={`${value} hábitos`}
        />
        <span className="text-xs mt-2">{day.slice(5)}</span>
      </div>
    );
  })}
</div>
      </div>
    </main>
  );
}