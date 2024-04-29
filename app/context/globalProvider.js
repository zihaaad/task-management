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

  const [tasks, setTasks] = useState([]);

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  React.useEffect(() => {
    if (user) return allTasks();
  }, [user]);
  return (
    <GlobalContext.Provider
      value={{theme, tasks, allTasks, deleteTask, isLoading}}>
      <GlobalUpdateContext.Provider value={{}}>
        <Toaster position="top-center" richColors />
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
