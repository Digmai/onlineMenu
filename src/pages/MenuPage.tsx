import { useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Footer } from "./../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { ProductsList } from "../components/Product/ProductsList";

const MenuPage = () => {
  const navigate = useNavigate();
  const puth = useParams();
  console.log("puth ==>", puth);

  const { category, subcategory } = useSelector(
    (state: RootState) => state.sortData
  );

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="menu-page containerr">
        <ProductsList category={category} subcategory={subcategory} />
        <Footer />
      </div>
    </>
  );
};

export default MenuPage;
