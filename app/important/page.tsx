"use client";

import Tasks from "../Tasks/Tasks";
import {useGlobalState} from "../context/globalProvider";

export default function Completed() {
  const {importantTasks} = useGlobalState();

  return (
    <>
      <Tasks tasks={importantTasks} title="Important Tasks" />
    </>
  );
}
