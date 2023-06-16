import styled from "styled-components";
import { ContainerTreeChildren } from "../styledType";

export const TreeDed = styled.div`
  min-width: 300px;
  width: min-content;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
`;

export const TreeDedContainer = styled.div`
  min-width: 100px;
  padding: 10px;
`;

export const TreeTitle = styled.div`
  width: 100%;
  height: min-cntent;
  position: relative;
  padding: 5px 0 5px 0;
  text-align: start;
  cursor: pointer;
  border-bottom: 1px solid #b2b2afcb;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #1677ff;
    border-bottom: 1px solid #1677ff;
  }
`;

export const TreeChildrenContainer = styled.section<ContainerTreeChildren>`
  width: 100%;
  height: ${({ isVisit }) => (isVisit ? "auto" : "0")};

  display: grid;
  grid-template-columns: min-content auto;

  opacity: ${({ isVisit }) => (isVisit ? "1" : "0")};
  transition: all 0.7s ease-in-out;

  overflow: hidden;
`;

export const TreeBorderRight = styled.div`
  width: 3px;
  height: 100%;
  margin: 10px;
  background-color: #b2b2afcb;
`;

export const TreeChildren = styled.div`
  width: 100%;
  displey: flex;
  flex-direction: column;
`;

export const TreeChildrenName = styled.div`
  min-width: 100px;
  width: 100%;
  padding: 10px;
  margin: 5px;

  display: flex;
  justify-content: space-between;

  cursor: pointer;

  border-bottom: 1px solid #b2b2afcb;

  transition: all 0.2s ease-in-out;

  &:hover {
    color: #1677ff;
    border-bottom: 1px solid #1677ff;
  }
`;
