import PropTypes from "prop-types";
import "./TaskList.css";

const TaskList = ({ tasks, selectedDate }) => {
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <main className="main">
      <div className="wrap">
        {filteredTasks.map((task, index) => (
          <div key={index} className="item-row">
            <div className="check-flag">
              <span className="small-text-label">Title</span>
              <span className="small-text-label hours">Hours</span>
              <span className="check-flag-label">{task.title}</span>
              <span className="hours-box">{task.hours}</span>
            </div>
          </div>
        ))}
        {filteredTasks.length > 0 && (
          <div className="total align-right">
            <label htmlFor="total" className="total-label">
              Total:
            </label>
            <input
              id="total"
              className="total-input"
              type="text"
              value={filteredTasks.reduce((sum, task) => sum + task.hours, 0)}
              readOnly
            />
          </div>
        )}
        {filteredTasks.length === 0 && (
          <p className="no-tasks-message">No tasks for the selected date.</p>
        )}
      </div>
    </main>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      hours: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedDate: PropTypes.string.isRequired,
};

export default TaskList;
