import React, { useEffect, useState } from "react";
import { ITable } from "../../types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { Button, List, notification } from "antd";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { deleteTable, getTables, selectTables } from "../../slices/table";

export const TablesList: React.FC = () => {
  const dispatch = useAppDispatch();

  const [tables, setTables] = useState<ITable[] | undefined>();

  const tablesSelect = useSelector(selectTables);

  useEffect(() => {
    dispatch(getTables());
  }, []);

  useEffect(() => {
    if (Array.isArray(tablesSelect)) {
      const sortedTables = [...tablesSelect].sort((a, b) =>
        Number(a.tableNumber) > Number(b.tableNumber) ? -1 : 1
      );
      setTables(sortedTables);
    }
  }, [tablesSelect]);

  const handleTableDelete = (tableNumber: string, _id: string) => {
    const updatedTables = tables?.filter(
      (table) => table.tableNumber !== tableNumber
    );
    setTables(updatedTables);
    dispatch(deleteTable(_id));
    notification.success({
      message: "Table deleted",
      description: `Table ${tableNumber} has been removed.`,
    });
  };

  if (!tables) return <LoadingSpinner />;

  return (
    <List
      style={{
        backgroundColor: "#f0f0f0",
        padding: "16px",
        borderRadius: "8px",
      }}
      dataSource={tables}
      bordered
      itemLayout="horizontal"
      renderItem={(item, index) => (
        <List.Item
          style={{
            border: "1px solid #d9d9d9",
            margin: "8px 0",
            padding: "12px",
            height: "60px",
            borderTop: index === 0 ? "none" : undefined,
            borderBottom: index === tables.length - 1 ? "none" : undefined,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          key={item._id}
        >
          <div>Table {item.tableNumber}</div>
          {tables[0].tableNumber === item.tableNumber && (
            <Button
              type="dashed"
              onClick={() => handleTableDelete(item.tableNumber, item._id)}
            >
              Delete
            </Button>
          )}
        </List.Item>
      )}
    />
  );
};
