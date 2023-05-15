import { useState } from "react";
import { Button, InputNumber, notification } from "antd";

interface User {
  role: string;
  table: number;
}

export interface TableType {
  users: User[];
  onAdd: (newTables: number[]) => void;
  tables: {
    id: string;
    name: string;
  }[];
}

const AddTables: React.FC<TableType> = ({ users, onAdd, tables }) => {
  const [number, setNumber] = useState<number | undefined>();

  const handleNumberChange = (value: number | null) => {
    if (value !== null) {
      setNumber(value);
    }
  };
  const handleAddTable = () => {
    if (!number || users.some((user) => user.table === number)) {
      notification.error({
        message: "Error",
        description: "Please select a valid table",
      });
      return;
    }
    const newTables = [number];
    onAdd(newTables);
    setNumber(undefined);
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
        style={{ marginRight: 16 }}
      />
      <Button type="primary" onClick={handleAddTable}>
        Add Table
      </Button>

      {tables.map((e) => (
        <div>{e.id + " " + e.name}</div>
      ))}
    </>
  );
};

export default AddTables;
