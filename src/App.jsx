import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        {location.pathname.startsWith("/admindashboard") ? (
          <AdminNavbar />
        ) : null}
        {location.pathname.startsWith("/user") ? <UserNavbar /> : null}
        {!location.pathname.startsWith("/user") &&
        !location.pathname.startsWith("/admindashboard") ? (
          <Navbar />
        ) : null}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<HomeC />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/createCourse" element={<CourseForm />} />
          <Route path="/search" element={<SearchHome />} />
          <Route path="/admindashboard" element={<AdminHome />} />
          <Route path="/admindashboard/products" element={<AdminProducts />} />
          <Route path="/admindashboard/users" element={<AdminUsers />} />
          <Route
            path="/admindashboard/notifications"
            element={<AdminNotifications />}
          />
          <Route path="/configuracion" element={<Configuration />} />
          <Route path="/user/home" element={<UserLanding />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/cart" element={<ShopCart />} />
        </Routes>
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
