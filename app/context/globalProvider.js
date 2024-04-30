"use client";
import React, {createContext, useState, useContext} from "react";
import themes from "./themes";
import {Toaster, toast} from "sonner";
import axios from "axios";
import {useUser} from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({children}) => {
  const {user} = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = themes[selectedTheme];
  const [modal, setModal] = useState(false);

  const [tasks, setTasks] = useState([]);
  console.log(modal);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const inCompleteTasks = tasks.filter((task) => task.isCompleted === false);

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      if (res.data) {
        toast.success("Task Deleted Successfully");
        allTasks();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      if (res.data) {
        toast.success("Task Updated Successfully");
        allTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        isLoading,
        allTasks,
        deleteTask,
        updateTask,
        completedTasks,
        inCompleteTasks,
        importantTasks,
        modal,
        openModal,
        closeModal,
      }}>
      <GlobalUpdateContext.Provider value={{}}>
        <Toaster position="top-center" richColors />
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
