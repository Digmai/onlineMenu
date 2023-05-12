import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setCategoryState, setSubcategoryState } from "../../slices/sortData";
import { faIdBadge } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConciergeBell, faHistory } from "@fortawesome/free-solid-svg-icons";

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

        <div className="footer__buttons">
          <svg
            className="icon-svg-bell"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M216 64c-13.3 0-24 10.7-24 24s10.7 24 24 24h16v33.3C119.6 157.2 32 252.4 32 368H480c0-115.6-87.6-210.8-200-222.7V112h16c13.3 0 24-10.7 24-24s-10.7-24-24-24H256 216zM24 400c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"
            ></path>
          </svg>
        </div>
        <div className="footer__buttons">
          <svg
            className="icon-svg-basket"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M327.9 2.2c-7.6 4.5-10.2 14.2-5.8 21.9l98 167.9H155.9l98-167.9c4.5-7.6 1.9-17.4-5.8-21.9s-17.4-1.9-21.9 5.8L118.8 192H65 32 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H40L99.9 463.5C107 492 132.6 512 162 512H414c29.4 0 55-20 62.1-48.5L536 224h24c8.8 0 16-7.2 16-16s-7.2-16-16-16H544 511 457.2L349.8 7.9c-4.5-7.6-14.2-10.2-21.9-5.8zM73 224H503L445.1 455.8C441.5 470 428.7 480 414 480H162c-14.7 0-27.5-10-31-24.2L73 224zm151 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm64-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm96 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z" />
          </svg>
        </div>
        <div className="footer__buttons">
          <svg
            className="svg-clock-rotate-left "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
