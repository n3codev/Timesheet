import PropTypes from "prop-types";
import "./CreateButton.css";

const CreateButton = ({ isDisabled, onClick, children }) => {
  return (
    <button
      className={`btn ${isDisabled ? "disabled" : ""}`}
      type="submit"
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

CreateButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CreateButton.defaultProps = {
  isDisabled: false,
  onClick: null,
};

export default CreateButton;
