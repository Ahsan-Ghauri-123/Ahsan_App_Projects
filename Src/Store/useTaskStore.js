import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      completedTasks: [], // ✅ new array for completed tasks

      addTask: (newTask) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now(), ...newTask }],
        })),

      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      completeTask: (id) =>
        set((state) => {
          const taskToComplete = state.tasks.find((t) => t.id === id);
          if (!taskToComplete) return state;
          return {
            tasks: state.tasks.filter((t) => t.id !== id),
            completedTasks: [...state.completedTasks, { ...taskToComplete }],
          };
        }),

      clearTasks: () => set({ tasks: [] }),
      clearCompletedTasks: () => set({ completedTasks: [] }), // ✅ optional
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTaskStore;
