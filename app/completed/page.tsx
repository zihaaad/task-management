"use client";

import Tasks from "../Tasks/Tasks";
import {useGlobalState} from "../context/globalProvider";

export default function Completed() {
  const {completedTasks} = useGlobalState();

  return (
    <>
      <Tasks tasks={completedTasks} title="Completed Tasks" />
    </>
  );
}
