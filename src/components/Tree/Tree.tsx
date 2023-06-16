import { useState } from "react";
import {
  TreeBorderRight,
  TreeChildren,
  TreeChildrenContainer,
  TreeChildrenName,
  TreeDedContainer,
  TreeTitle,
} from "../../styled/Tree/tree";
interface Props {
  title: string;
  list: {
    title: string;
    key: string;
    _id?: string;
    list?: {
      key: string;
      title: string;
    }[];
  }[];
  callback: (productId: string) => () => void;

  children?: React.ReactElement;
}

const NewTree: React.FC<Props> = ({ list, title, children, callback }) => {
  const [isVisit, setIsVisit] = useState(false);

  const hendelVisitTree = () => {
    setIsVisit((v) => !v);
  };

  return (
    <TreeDedContainer>
      <TreeTitle onClick={hendelVisitTree}>{title}</TreeTitle>
      <TreeChildrenContainer isVisit={isVisit}>
        <TreeBorderRight />
        <TreeChildren>
          {list.map((node) =>
            !!node.list ? (
              <NewTree title={node.title} list={node.list} callback={callback}>
                {children}
              </NewTree>
            ) : (
              <TreeChildrenName>
                {node._id && (
                  <div onClick={callback(node._id)}>{node.title}</div>
                )}
                {children}
              </TreeChildrenName>
            )
          )}
        </TreeChildren>
      </TreeChildrenContainer>
    </TreeDedContainer>
  );
};

export default NewTree;
