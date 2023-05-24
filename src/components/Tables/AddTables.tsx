import { ITable } from "../../types";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { createTable, getTables } from "../../slices/table";
import { Button, InputNumber, List, notification } from "antd";

const AddTables: React.FC = () => {
  const [number, setNumber] = useState<number | null>();
  const [tables, setTables] = useState<ITable[] | undefined>();

  const tablesSelect = useSelector((state: RootState) => state.tables.table);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTables());
  }, []);

  useEffect(() => {
    console.log(tablesSelect);

    if (tablesSelect) {
      const sortedTables = [...tablesSelect].sort((a, b) =>
        Number(a.tableNumber) > Number(b.tableNumber) ? -1 : 1
      );
      setTables(sortedTables);
      console.log(sortedTables);
    }
  }, [tablesSelect]);

  const handleNumberChange = (value: number | null) => {
    setNumber(value);
  };
  const handleCreateTable = (tableNumber: number) => {
    dispatch(createTable(tableNumber));
  };

  const handleTableDelete = (tableNumber: number) => {
    const updatedTables = tables?.filter(
      (table) => table.tableNumber !== tableNumber
    );
    setTables(updatedTables);

    notification.success({
      message: "Table deleted",
      description: `Table ${tableNumber} has been removed.`,
    });
  };

  const handleAddTable = () => {
    if (!number) {
      notification.error({
        message: "Error",
        description: "Please select a valid table",
      });
      setNumber(0);
      return;
    }
    if (tables && tables.some((table) => table.tableNumber === number)) {
      setNumber(0);
      notification.error({
        message: "Error",
        description: "Table already exists",
      });
      return;
    }

    handleCreateTable(number);
    setNumber(0);
    notification.success({
      message: "Table added",
      description: `Table ${number} has been added.`,
    });
  };

  return (
    <>
      <InputNumber
        min={1}
        placeholder="Enter table number"
        onChange={handleNumberChange}
        style={{ marginRight: 16, minWidth: "100px" }}
      />
      <Button type="primary" onClick={handleAddTable}>
        Add Table
      </Button>
      {tables && (
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
              key={item.tableNumber}
            >
              <div>Table {item.tableNumber}</div>

              <Button
                type="dashed"
                onClick={() => handleTableDelete(item.tableNumber)}
              >
                Delete
              </Button>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default AddTables;
