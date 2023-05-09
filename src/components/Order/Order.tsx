import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { addOrder } from "../../slices/orders";
import { formatCurrency } from "../../utils/formatCurrency";

const Order: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<
    { _id: string; name: string; price: number; quantity: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const product = useSelector((state: RootState) => state.product.product);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const addItem = (item: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    let updatedItems = [...selectedItems];
    const existingItem = selectedItems.find((i) => i._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push(item);
    }
    setSelectedItems(updatedItems);
    setTotalPrice(totalPrice + item.price);
  };

  const removeItem = (item: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    let updatedItems = [...selectedItems];
    const existingItem = selectedItems.find((i) => i._id === item._id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        updatedItems = updatedItems.filter((i) => i._id !== item._id);
      } else {
        existingItem.quantity -= 1;
      }
    } else {
      updatedItems.push({ ...item, quantity: 1 });
    }
    setSelectedItems(updatedItems);
    setTotalPrice(totalPrice - item.price);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addOrder()
      //   {
      //     userId: user!.user!.,
      //     items: selectedItems,
      //     total: totalPrice,
      //   }
    );
    setSelectedItems([]);
    setTotalPrice(0);
  };

  return (
    <div className="order">
      <h2>Order1</h2>
      <form onSubmit={handleSubmit}>
        <div className="order-items">
          <h4>Dishes</h4>
          <ul>
            {product.map((item) => (
              <li key={item._id}>
                <span>{item.name}</span>
                <span>{formatCurrency(item.price)}</span>
                <button
                  type="button"
                  onClick={() => addItem({ ...item, quantity: 1 })}
                >
                  +
                </button>
              </li>
            ))}
          </ul>

        </div>
        <div className="order-summary">
          <h4>Summary</h4>
          <ul>
            {selectedItems.map((item) => (
              <li key={item._id}>
                <span>{item.name}</span>
                <span>{formatCurrency(item.price)}</span>
                <button type="button" onClick={() => removeItem(item)}>
                  -
                </button>
                <span>{item.quantity}</span>
              </li>
            ))}
          </ul>
          <h4>Total: {formatCurrency(totalPrice)}</h4>
          <button type="submit">Submit Order</button>
        </div>
      </form>
    </div>
  );
};

export default Order;
