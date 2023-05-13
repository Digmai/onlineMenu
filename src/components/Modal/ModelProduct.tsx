import React from "react";
import { Modal } from "antd";
import { IProduct } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { addItemToCart } from "../../slices/orders";
import { useAppDispatch } from "../../store";

interface IModel {
  handleCancel: () => void;
  visible: boolean;
  product: IProduct;
}

export const ModelProduct: React.FC<IModel> = ({
  handleCancel,
  visible,
  product,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addItemToCart(product));
    handleCancel();
  };

  return (
    <Modal
      title={product.DishOrDrink}
      onCancel={handleCancel}
      footer={null}
      open={visible}
    >
      <div className="modal">
        <img src={product.image} alt="" className="modal__imege"></img>
        <div key={product._id} className="modal__img-circle " />

        <div className="modal__detail">
          <div className="modal__detail-name">{product.name}</div>
          {product.ingredients.map((e, i) => (
            <div key={i} className="modal__detail-ingredients">
              <div className="modal__detail-ingredients-name">{e.name}</div>
              <div className="modal__detail-ingredients-weight">
                {e.weight} {product.DishOrDrink === "Dish" ? "г." : "мл."}
              </div>
            </div>
          ))}
          <div className="modal__detail-time">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Cooking Time: {product.CookingTime} min
          </div>
        </div>

        <div className="modal__buttom">
          <button className="modal__buttom-page" onClick={() => handleClick()}>
            <div className="modal__button-text">Добавить</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};
