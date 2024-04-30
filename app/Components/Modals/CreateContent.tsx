"use client";

import {useGlobalState} from "@/app/context/globalProvider";
import {plus} from "@/app/utils/icons";
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

  const {allTasks, isLoading, theme, closeModal} = useGlobalState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        return toast.error(res.data.error);
      }

      toast.success("Task Created Successfully");
      closeModal();
      allTasks();
    } catch (error) {
      toast.error("Something went Wrong");
      console.log("[POST]/api/tasks", error);
    }
  };

  return (
    <CreateContentStyled theme={theme} onSubmit={handleSubmit}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
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
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g, Fireship is a greate channel to watch as a programmer."
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
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
      <div className="submit-btn flex justify-end">
        <button
          className="flex items-center gap-2 bg-opacity-60 bg-blue-500  hover:bg-green-700"
          type="submit"
          value="Submit">
          <span>{plus}</span> Create Task
        </button>
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    display: inline-flex;
    padding: 0.4rem 1rem;
    border-radius: 30px;

    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;
