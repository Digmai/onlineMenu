import { Link } from "react-router-dom";

export const OrderFooter = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <Link to={"/"} className="order-page__footer-button icon-svg-color">
          <svg
            className="icon-svg-color icon-svg-chevron-left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M20.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l192-192c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L54.6 256 235.3 436.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-192-192z" />
          </svg>
          Вернуться в меню
        </Link>
      </div>
    </div>
  );
};
