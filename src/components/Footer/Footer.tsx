import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setCategoryState, setSubcategoryState } from "../../slices/sortData";

export const Footer = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<string>();
  const [subcategory, setSubcategory] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    category && dispatch(setCategoryState(category));
    subcategory && dispatch(setSubcategoryState(subcategory));
    return () => {
      setCategory("");
      setSubcategory("");
      inputRef.current && (inputRef.current.checked = false);
    };
  }, [category, subcategory]);

  const sortedData = useSelector((state: RootState) => state.product.product);
  if (!sortedData) return <div>null</div>;
  return (
    <div className="footer">
      <div className="footer__content">
        <div role="" className="footer__buttons navigation">
          <div id="menuToggle" className="navigation__menu-toggle">
            <input type="checkbox" ref={inputRef} />
            <span></span>
            <span></span>
            <span></span>

            <div id="menu" className="navigation__menu">
              {Object.keys(sortedData).map((category) => (
                <div
                  key={category}
                  className="navigation__menu-checkbox  navigation__menu-checkbox-category li"
                >
                  <div
                    onClick={() => setCategory(category)}
                    className="navigation__menu-category"
                  >
                    {category}
                  </div>
                  {Object.keys(sortedData[category]).map((subcategory) => (
                    <div className="navigation__menu-checkbox navigation__menu-checkbox-subcategory ul">
                      <div
                        className=" navigation__menu-subcategory li"
                        key={subcategory}
                        onClick={() => setSubcategory(subcategory)}
                      >
                        <>{subcategory}</>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__buttons"></div>
        <div className="footer__buttons"></div>
        <div className="footer__buttons"></div>
      </div>
    </div>
  );
};
