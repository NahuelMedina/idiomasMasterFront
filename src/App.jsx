import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Landing,
  HomeC,
  Register,
  Login,
  Detail,
  CourseForm,
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
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userData);
  const [userData] = useLocalStorage("userData", {});

  useEffect(() => {
    if (data) {
      if (data.profile === "admin") {
        navigate("/admindashboard");

      } else {
        navigate("/user/home");
        
      }
    }
  }, [data.status]);

  console.log(userData);
  return (
    <>
      <AuthProvider>
        <div className="w-screen h-screen min-h-[750px] flex flex-col">
          <div className="w-full h-[80px]">
            {Object.keys(data).length === 0 &&
            data.isAuthenticated === undefined &&
            Object.keys(userData).length === 0 ? (
              <Navbar />
            ) : null}

            {(Object.keys(data).length &&
              data.isAuthenticated &&
              data.profile === "user") ||
            (Object.keys(userData).length && userData.profile === "user") ? (
              <>
                <UserNavbar />
              </>
            ) : null}

            {(Object.keys(data).length &&
              data.isAuthenticated &&
              data.profile === "user") ||
            (Object.keys(userData).length && userData.profile === "admin") ? (
              <>
                <AdminNavbar />
              </>
            ) : null}

            {/* {location.pathname.startsWith("/admindashboard") ? (
              
            ) : null}
            {location.pathname.startsWith("/user") ? <UserNavbar /> : null}
            {!location.pathname.startsWith("/user") &&
            !location.pathname.startsWith("/admindashboard") ? (
             
            ) : null} */}
          </div>
          <div className="w-full h-[95%]">
            <Routes>
              <Route path="/home" element={<HomeC />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/search" element={<SearchHome />} />


              {Object.keys(data).length === 0 &&
              data.isAuthenticated === undefined &&
              Object.keys(userData).length === 0 ? (
                <>
                  <Route path="/" element={<Landing />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                </>
              ) : null}

              {(Object.keys(data).length &&
                data.isAuthenticated &&
                data.profile === "user") ||
              (Object.keys(userData).length && userData.profile === "user") ? (
                <>
                  <Route path="/configuracion" element={<Configuration />} />
                  <Route path="/user/home" element={<UserLanding />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/cart" element={<ShopCart />} />
                </>
              ) : null}

              {/* <Route path="/createCourse" element={<CourseForm />} /> */}

              {(Object.keys(data).length &&
                data.isAuthenticated &&
                data.profile === "user") ||
              (Object.keys(userData).length && userData.profile === "admin") ? (
                <>
                
                <Route path="/admindashboard" element={<AdminHome />} />

              <Route
                path="/admindashboard/products"
                element={<AdminProducts />}
              />
              <Route path="/admindashboard/users" element={<AdminUsers />} />
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
