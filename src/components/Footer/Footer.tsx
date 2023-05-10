import React from "react";
import { selectAllProduct } from "../../slices/product";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const sortedData = useSelector((state: RootState) => state.product.product);
  if (!sortedData) return <div>null</div>;
  return (
    <div className="footer">
      <div className="footer__content">
        <div role="" className="footer__buttons navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              {Object.keys(sortedData).map((category) => (
                <NavLink key={category} to={"menu/" + category}>
                  {category}
                  <ul>
                    {Object.keys(sortedData[category]).map((subcategory) => (
                      <li key={subcategory}>
                        {subcategory}
                        {/* <ul>
                          {sortedData[category][subcategory].map((item) => (
                            <li key={item._id}>{item.name}</li>
                          ))}
                        </ul> */}
                      </li>
                    ))}
                  </ul>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__buttons"></div>
        <div className="footer__buttons"></div>
        <div className="footer__buttons"></div>
      </div>
    </div>
  );
};
