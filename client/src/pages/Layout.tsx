import Header from "@/components/Header";
import { checkIsAuth } from "@/components/store/userSlice";
import { useTypedDispatch } from "@/hooks/useReduxTypedHooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkIsAuth());
    }
  }, []);
  return (
    <div className="w-full flex">
      <div className="w-full max-w-[1280px] mx-auto ">
        <Header />
        <main className="py-10 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
