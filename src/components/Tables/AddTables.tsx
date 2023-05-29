import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import { createTable } from "../../slices/table";
import { Button, InputNumber, notification } from "antd";

const AddTables: React.FC = () => {
  const dispatch = useAppDispatch();

  const [number, setNumber] = useState<number | null>();

  const handleNumberChange = (value: number | null) => {
    setNumber(value);
  };
  const handleCreateTable = (tableNumber: number) => {
    dispatch(createTable(tableNumber));
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
    // if (tables && tables.some((table) => table.tableNumber === number)) {
    //   setNumber(0);
    //   notification.error({
    //     message: "Error",
    //     description: "Table already exists",
    //   });
    //   return;
    // }

    handleCreateTable(number);
    // setNumber(0);
    notification.success({
      message: "Table added",
      description: `Table ${number} has been added.`,
    });
  };

  return (
    <>
      <InputNumber
        min={1}
        placeholder="Укажите количество"
        onChange={handleNumberChange}
        style={{ marginRight: 16, minWidth: "14vw", marginBottom: "50px" }}
      />
      <Button type="primary" onClick={handleAddTable}>
        Добавить столы
      </Button>
      {/* {tables && (
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
      )} */}
    </>
  );
};

export default AddTables;
