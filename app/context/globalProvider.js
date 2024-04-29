"use client";
import React, {createContext, useState, useContext} from "react";
import themes from "./themes";
import {Toaster, toast} from "sonner";
import axios from "axios";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({children}) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = themes[selectedTheme];

  const [tasks, setTasks] = useState([]);

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      console.log(res.data);
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    allTasks();
  }, []);
  return (
    <GlobalContext.Provider value={{theme, tasks}}>
      <GlobalUpdateContext.Provider value={{}}>
        <Toaster position="top-center" richColors />
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
