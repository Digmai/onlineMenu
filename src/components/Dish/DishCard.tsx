import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { Dish } from "../../types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface DishCardProps {
  dish: Dish;
}

const CardWrapper = styled.div`
  background-image: url("https://source.unsplash.com/500x550/?tree,nature");

  background-repeat: no-repeat;

  width: 450px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const OverlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.h4`
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Meta = styled.small`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: #c2c2c2;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;r;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
 

`;

const OrderButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #000000;
    color: #ffffff;
    cursor: pointer;
  }
`;

const DishesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DishTitle = styled.h4`
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const IngredientsList = styled.ul`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: #c2c2c2;

  li {
    list-style: none;
  }
`;
const Author = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
`;

const TimeMeta = styled(Meta)`
  margin-bottom: 0;
  margin-right: 70px;
  @media (min-width: 596px) {
    margin-left: 0;
    text-align: left;
  }
  @media (max-width: 554px) {
    margin-left: 0;
    margin-right: 50px;
    text-align: left;
  }
  @media (max-width: 350px) {
    margin-left: 0;
    margin-right: 25px;
    text-align: left;
  }
`;

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...dish }));
  };

  const ing = [
    "Lobster",
    "Risotto Rice",
    "Onion",
    "Garlic",
    "Butter",
    "White Wine",
  ];
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
      <CardWrapper className="card text-white card-has-bg click-col">
        <OverlayWrapper className="card-img-overlay d-flex flex-column">
          <Footer className="card-footer">
            <div className="card-body">
              <Meta className="card-meta mb-2">Dishes</Meta>
              <DishesContainer>
                <DishTitle className="card-title mt-0">
                  Lobster risotto
                </DishTitle>
                <IngredientsList className="row">
                  {ing.join(", ")}
                </IngredientsList>
              </DishesContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></div>
            </div>

            <Author className="media">
              <TimeMeta>
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Cooking time: 30 min
              </TimeMeta>
              <OrderButton onClick={handleAddToCart}>добавить</OrderButton>
            </Author>
          </Footer>
        </OverlayWrapper>
      </CardWrapper>
    </div>
  );
};
export default DishCard;

// <div className="dish-card item-card">
//   <img src={dish.image} alt={dish.name} />
//   <div className="dish-card-info item-card-info">
//     <h3>{dish.name}</h3>
//     <p>{formatCurrency(dish.price)}</p>
//     <button onClick={handleAddToCart}>Add to Cart</button>
//   </div>
// </div>
