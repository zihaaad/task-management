"use client";

import {useGlobalState} from "@/app/context/globalProvider";
import axios from "axios";
import {useState} from "react";
import {toast} from "sonner";
import styled from "styled-components";

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(Boolean);
  const [important, setImportant] = useState(Boolean);

  const {allTasks} = useGlobalState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    console.log(task);
    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        return toast.error(res.data.error);
      }

      toast.success("Task Created Successfully");
      allTasks();

      console.log(res);
    } catch (error) {
      toast.error("Something went Wrong");
      console.log("[POST]/api/tasks", error);
    }
  };

  return (
    <div>
      <h1>Create a Task</h1>
      <CreateContentStyled onSubmit={handleSubmit}>
        <div className="input-control">
          <label htmlFor="title">Title</label>
          <input
            className="text-black"
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g, Watch a Video from Fireship"
          />
        </div>
        <div className="input-control">
          <label htmlFor="description">Description</label>
          <textarea
            className="text-black"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g, Fireship is a greate channel to watch as a programmer."
          />
        </div>
        <div className="input-control">
          <label htmlFor="date">Date</label>
          <input
            className="text-black"
            type="datetime-local"
            value={date}
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="completed">Toggle Completed</label>
          <input
            type="checkbox"
            value={completed.toString()}
            name="completed"
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className="input-control toggler">
          <label htmlFor="important">Toggle Important</label>
          <input
            type="checkbox"
            value={important.toString()}
            name="important"
            onChange={(e) => setImportant(e.target.checked)}
          />
        </div>
        <div className="submit-btn">
          <button type="submit" value="Submit">
            Submit
          </button>
        </div>
      </CreateContentStyled>
    </div>
  );
}

const CreateContentStyled = styled.form``;
