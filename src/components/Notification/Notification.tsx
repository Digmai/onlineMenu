import React from "react";
import {
  CloseButton,
  NotificationMessage,
  NotificationWrapper,
} from "../../styled/Notification";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  let notificationClassName = "notification";
  if (type === "success") {
    notificationClassName += " success";
  } else if (type === "error") {
    notificationClassName += " error";
  }

  return (
    <NotificationWrapper type={type}>
      <NotificationMessage>{message}</NotificationMessage>
      <CloseButton>&#x2715;</CloseButton>
    </NotificationWrapper>
  );
};

export default Notification;
