import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxTypedHooks";
import { Link, useNavigate } from "react-router-dom";
import { logOutThunk } from "./store/userSlice";

const Header = () => {
  const userData = useTypedSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const handler = () => {
    dispatch(logOutThunk()).then(() => navigate("/log-in"));
  };

  console.log(userData);
  return (
    <div className="w-full h-20 flex shadow-md items-center justify-between px-4">
      <Link to="/" className="font-medium text-gray-800">
        JWT Authorization
      </Link>
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
          <p className="px-2 cursor-pointer" onClick={handler}>
            Log out
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
