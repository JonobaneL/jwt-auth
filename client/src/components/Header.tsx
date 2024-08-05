import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxTypedHooks";
import { Link } from "react-router-dom";
import { checkIsAuth, logOutThunk } from "./store/userSlice";

const Header = () => {
  const userData = useTypedSelector((state) => state);
  const dispatch = useTypedDispatch();
  const handler = () => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      dispatch(checkIsAuth());
    }
  };
  const handler1 = () => {
    dispatch(logOutThunk());
  };

  return (
    <div className="w-full h-20 flex shadow-md items-center justify-between px-4">
      <h2 className="font-medium text-gray-800">JWT Authorization</h2>
      {!userData?.isAuth ? (
        <ul className="flex items-center divide-x-2">
          <li className="px-2">
            <Link to="/log-in">Log In</Link>
          </li>
          <li className="px-2">
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      ) : (
        <div className="flex items-center divide-x-2">
          <p className="px-2">{userData?.user?.email}</p>
          <p className="px-2" onClick={handler}>
            Log out
          </p>
          <p className="px-2" onClick={handler1}>
            Log out2
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
