import styled, { css } from "styled-components";
import { NotificationProps } from "./types/styledType";

export const NotificationWrapper = styled.div<NotificationProps>`
  position: absolute;
  z-index: 10000;
  left: 100px;
  margim: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;

  ${({ type }) =>
    type === "success" &&
    css`
      background-color: #4caf50;
    `}

  ${({ type }) =>
    type === "error" &&
    css`
      background-color: #f44336;
    `}
`;

export const NotificationMessage = styled.p`
  margin: 0;
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
`;
