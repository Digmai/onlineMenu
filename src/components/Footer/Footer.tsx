import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setCategoryState } from "../../slices/sortData";

export const Footer = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<string>();
  const [subcategory, setSubcategory] = useState<string>();

  useEffect(() => {
    category && dispatch(setCategoryState(category));
  }, [category]);
  useEffect(() => {
    subcategory && dispatch(setCategoryState(subcategory));
  }, [subcategory]);

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
                <li key={category} onClick={() => setCategory(category)}>
                  {category}
                  <ul>
                    {Object.keys(sortedData[category]).map((subcategory) => (
                      <li
                        key={subcategory}
                        onClick={() => setSubcategory(subcategory)}
                      >
                        {subcategory}
                      </li>
                    ))}
                  </ul>
                </li>
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
