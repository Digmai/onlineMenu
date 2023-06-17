import { useNavigate } from "react-router-dom";
import { setFakeRoel } from "../slices/user";
import { useAppDispatch } from "../store";
import { Role } from "../types";
import { useEffect } from "react";

const users: Role[] = ["admin", "customer", "waiter", "bartender", "cook"];

export const FakeLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  //
  // fn dispatch user role store
  const addUserRoleStore = (user: Role) => {
    return () => dispatch(setFakeRoel(user));
  };

  return (
    <>
      <div className="wrapper">
        {users.map((user) => (
          <div onClick={addUserRoleStore(user)} className="wrapper__items">
            {user}
          </div>
        ))}
      </div>
    </>
  );
};
