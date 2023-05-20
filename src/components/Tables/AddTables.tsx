import React, { useEffect, useState } from "react";
import { Button, InputNumber, notification } from "antd";
import { useSelector } from "react-redux";
import { getTable } from "../../slices/table";
import { RootState, useAppDispatch } from "../../store";
import { ITable } from "../../types";

interface User {
  role: string;
  table: number;
}

export interface TableType {
  users: User[];
  onAdd: (newTables: number[]) => void;
}

const AddTables: React.FC<TableType> = ({ users, onAdd }) => {
  const [number, setNumber] = useState<number | undefined>();
  const [tables, setTables] = useState<ITable[] | null>(null);

  const tablesSelect = useSelector((state: RootState) => state.tables.table);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(getTable(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tablesSelect) {
      setTables(tablesSelect);
    }
  }, [tablesSelect]);
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

  if (!tables) return <p>Loading...</p>;
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
      {tables && tables.map((e) => <div key={e.id}>{e.id + " " + e.num}</div>)}
    </>
  );
};

export default AddTables;
