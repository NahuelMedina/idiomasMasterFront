import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Navbar,
  Landing,
  HomeC,
  Register,
  Login,
  Detail,
  About,
  SearchHome,
  Configuration,
  AuthProvider,
  Favorite,
  ShopCart,
} from "./components";
import AdminHome from "./components/Admin/adminHome";
import AdminNavbar from "./components/Admin/adminNavbar";
import AdminProducts from "./components/Admin/adminProducts";
import UserLanding from "./components/User/UserLand";
import UserNavbar from "./components/User/UserNavbar";
import AdminUsers from "./components/Admin/adminUsers";
import AdminNotifications from "./components/Admin/adminNotifications";
import AdminSettings from "./components/Admin/adminSettings";
import { useLocalStorage } from "./CustomHook/UseLocalStorage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const loginData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    setData(userData);
  }, []);

  useEffect(() => {
    if (loginData.isAuthenticated && Object.keys(data).length === 0) {
      setData(loginData);
    }
  }, [loginData.isAuthenticated]);

  useEffect(() => {
    if (data.profile) {
      navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
    }
  }, [data]);

  return (
    <>
      <AuthProvider>
        <div className="w-screen h-screen min-h-[750px] flex flex-col">
          <div className="w-full h-[80px]">
            {Object.keys(data).length === 0 &&
            data.isAuthenticated === undefined ? (
              <Navbar />
            ) : null}

            {Object.keys(data).length &&
            data.isAuthenticated &&
            data.profile === "user" ? (
              <UserNavbar />
            ) : null}

            {Object.keys(data).length &&
            data.isAuthenticated &&
            data.profile === "admin" ? (
              <AdminNavbar />
            ) : null}
          </div>
          <div className="w-full h-[95%]">
            <Routes>
              <Route path="/home" element={<HomeC />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/search" element={<SearchHome />} />

              {Object.keys(data).length === 0 &&
              data.isAuthenticated === undefined ? (
                <>
                  <Route path="/" element={<Landing />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                </>
              ) : null}

              {Object.keys(data).length &&
              data.isAuthenticated &&
              data.profile === "user" ? (
                <>
                  <Route path="/configuracion" element={<Configuration />} />
                  <Route path="/user/home" element={<UserLanding />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/cart" element={<ShopCart />} />
                </>
              ) : null}

              {Object.keys(data).length &&
              data.isAuthenticated &&
              data.profile === "admin" ? (
                <>
                  <Route path="/admindashboard" element={<AdminHome />} />
                  <Route
                    path="/admindashboard/products"
                    element={<AdminProducts />}
                  />
                  <Route
                    path="/admindashboard/users"
                    element={<AdminUsers />}
                  />
                  <Route
                    path="/admindashboard/notifications"
                    element={<AdminNotifications />}
                  />
                  <Route
                    path="/admindashboard/settings"
                    element={<AdminSettings />}
                  />
                </>
              ) : null}
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;

{
  /*     
        <Route path="/home" element={} />
        <Route path="/login" element={} />
        <Route path="/about" element={} />
        <Route path="/buyPremium" element={} />
        <Route path="/detail:id" element={} /> 
*/
}
