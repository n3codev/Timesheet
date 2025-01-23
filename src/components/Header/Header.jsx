import PropTypes from "prop-types";
import "./Header.css";
import { useState, useEffect } from "react";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import BasicDatePicker from "../DatePicker/BasicDatePicker";
import { fetchRandomQuote } from "../../api/quotesApi";

const Header = ({ tasks, onCreateTask, selectedDate, onDateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);

  useEffect(() => {
    const getQuote = async () => {
      const { quote, author } = await fetchRandomQuote();
      setQuote(quote);
      setAuthor(author);
    };

    getQuote();
  }, []);

  return (
    <>
      <header className="header">
        <div className="wrap">
          <span className="btn-icon" onClick={handleOpenModal}>
            <img
              className="icon icon-plus"
              src="/src/assets/icons/icon-plus.svg"
              alt="Add New Item"
            />
          </span>
          <div className="header-blockquote">
            <h1 className="header-quote">{quote}</h1>
            <h3 className="header-cite">- {author}</h3>
          </div>
          <div className="date-wrap">
            <BasicDatePicker
              selectedDate={selectedDate}
              onChange={(newDate) => onDateChange(newDate)}
            />
          </div>
        </div>
        <div className="header-inner"></div>
      </header>
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={onCreateTask}
        totalHours={totalHours}
      />
    </>
  );
};

Header.propTypes = {
  tasks: PropTypes.array.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default Header;
