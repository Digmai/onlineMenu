import { useSelector } from "react-redux";
import {
  selectCarts,
  selectTotalPrice,
  removeItemFromCart,
} from "../../slices/orders";
import { useAppDispatch } from "../../store";

export const OrderCart = () => {
  const dispatch = useAppDispatch();
  const carts = useSelector(selectCarts);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="order-page">
      <div className="order-page__heder-text">Заказ</div>
      <div className="">
        {carts.map((product, index) => (
          <div
            key={index}
            className=" order-page__cart"
            onClick={() => dispatch(removeItemFromCart(index))}
          >
            <div className="order-page__cart-img">
              <img
                src={product.image}
                alt=""
                className="order-page__cart-img-src"
              ></img>
            </div>
            <div className="order-page__cart-nema-and-total-weight">
              <div className="order-page__cart-nema">{product.name}</div>
              <div className="order-page__cart-total-weight">
                {product.totalWeight}{" "}
                {product.DishOrDrink === "Dish" ? "г." : "мл."}
              </div>
            </div>
            <div className="order-page__cart-price">{product.price} p</div>
          </div>
        ))}
      </div>
      <div className="order-page__total-price">Всего: {totalPrice}</div>

      <div className="order-page__button modal__buttom">
        <button className="modal__buttom-page order-page__button-page">
          <div className="modal__button-text">Заказать</div>
        </button>
      </div>
    </div>
  );
};
