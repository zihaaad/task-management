"use client";

import Tasks from "../Tasks/Tasks";
import {useGlobalState} from "../context/globalProvider";

export default function InComplete() {
  const {inCompleteTasks} = useGlobalState();

  return (
    <>
      <Tasks tasks={inCompleteTasks} title="Incomplete Tasks" />
    </>
  );
}
