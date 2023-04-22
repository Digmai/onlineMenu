import React from "react";
import "./Notification.css";

interface NotificationProps {
  message: string;
  type: "success" | "error";

}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,

}) => {

  let notificationClassName = "notification";
  if (type === "success") {
    notificationClassName += " success";
  } else if (type === "error") {
    notificationClassName += " error";
  }

  return (
    <div className={notificationClassName}>
      <p className="notification-message">{message}</p>
      <button  className="close-button">
        &#x2715;
      </button>
    </div>
  );
};

export default Notification;


