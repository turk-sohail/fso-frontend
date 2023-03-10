const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    <div className="error">{message}</div>;
  }
};
export default Notification;
