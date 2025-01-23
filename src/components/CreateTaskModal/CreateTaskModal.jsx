import PropTypes from "prop-types";
import "./CreateTaskModal.css";
import CreateButton from "../Button/CreateButton";
import { useState } from "react";
import dayjs from "dayjs";

const CreateTaskModal = ({ isOpen, onClose, onCreate, totalHours }) => {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [errors, setErrors] = useState({ title: "", hours: "" });

  const validateFields = () => {
    const newErrors = { title: "", hours: "" };

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!hours.trim() || isNaN(hours) || Number(hours) <= 0) {
      newErrors.hours = "Hours must be a positive number.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const newTotalHours = totalHours + Number(hours);
    if (newTotalHours > 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hours: "Total hours cannot exceed 8.",
      }));
      return;
    }

    const currentDate = dayjs().format("DD-MM-YYYY");

    onCreate({ title: title.trim(), hours: Number(hours), date: currentDate });
    setTitle("");
    setHours("");
    setErrors({ title: "", hours: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-wrap ${isOpen ? "is-visible" : ""}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create a Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="field-wrap">
            <label className="label" htmlFor="title">
              Title:
            </label>
            <input
              className="field"
              type="text"
              id="title"
              placeholder="Enter title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <div className="field-wrap">
            <label className="label" htmlFor="hours">
              Hours:
            </label>
            <input
              className="field"
              type="number"
              id="hours"
              placeholder="Add hours here..."
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              min="1"
              step="1"
            />
            {errors.hours && <span className="error">{errors.hours}</span>}
          </div>
          <div className="btn-wrap align-right">
            <CreateButton
              isDisabled={!title || !hours || totalHours + Number(hours) > 8}
              onClick={handleSubmit}
            >
              Create
            </CreateButton>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  totalHours: PropTypes.number.isRequired,
};

export default CreateTaskModal;
