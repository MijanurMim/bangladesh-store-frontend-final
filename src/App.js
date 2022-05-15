// MANNAGED
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AccessoriesList from "./components/Admin/AccessoriesList/AccessoriesList";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import NewAccessory from "./components/Admin/Dashboard/NewAccessory/NewAccessory";
import NewProduct from "./components/Admin/Dashboard/NewProduct/NewProduct";
import NewUnit from "./components/Admin/Dashboard/NewUnit/NewUnit";
import UpdateAccessory from "./components/Admin/Dashboard/UpdateAccessory/UpdateAccessory";
import UpdateProduct from "./components/Admin/Dashboard/UpdateProduct/UpdateProduct";
import UpdateUnit from "./components/Admin/Dashboard/UpdateUnit/UpdateUnit";
import ProductsList from "./components/Admin/ProductsList/ProductsList";
import UnitPriceList from "./components/Admin/UnitPriceList/UnitPriceList";
import PrivateRoute from "./components/Route/PrivateRoute";
import { auth } from "./Firebase/Firebase";
import { CurrentUser } from "./Functions/AuthFunctions";
import JwellaryBag from "./Pages/Accessories/JwelleryBag/JwelleryBag";
import JwelleryBox from "./Pages/Accessories/JwelleryBox/JwelleryBox";
import JwelleryMachine from "./Pages/Accessories/JwelleryMachine/JwelleryMachine";
import MenufactureItem from "./Pages/Accessories/MenufactureItem/MenufactureItem";
import AboutUs from "./Pages/Home/AboutUs/AboutUs";
import ContactUs from "./Pages/Home/ContactUs/ContactUs";
import Footer from "./Pages/Home/Footer/Footer";
import Home from "./Pages/Home/Home/Home";
import LoginPage from "./Pages/LoginPage/LoginPage";
import NavBar from "./Pages/NavBar/NavBar";
import NotFound from "./Pages/NotFound/NotFound";
import OurService from "./Pages/OurService/OurService";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import AllProducts from "./Pages/Products/AllProducts/AllProducts";
import Diamonds from "./Pages/Products/Diamonds/Diamonds";
import Gold from "./Pages/Products/Gold/Gold";
import Silver from "./Pages/Products/Silver/Silver";
import { logInSuccess } from "./redux/actions/userAction";

function App() {
  // Loading User Data Before Routing Starts
  const dispatch = useDispatch();
  useEffect(() => {
    // store.dispatch(loadUser());

    const user = auth.currentUser;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        const idtoken = await user.getIdTokenResult();

        const { accessToken, email, emailVerified } = user;

        // dispatch(logInSuccess(email, accessToken, emailVerified, null))

        await CurrentUser(idtoken.token).then((res) => {
          console.log(res.data);
          console.log(idtoken.token);
          const { name, role } = res.data;
          window.localStorage.setItem(`role`, `${role}`);
          const storedRole = localStorage.getItem("role");
          dispatch(logInSuccess(name, idtoken.token, storedRole));

          // dispatch(
          //   logInSuccess(
          //     res.data.email,
          //     idtoken.token,
          //     emailVerified,
          //     res.data.role,
          //     res.data.cart,
          //     res.data.wishlist,
          //   ),
          // )
        });
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  // Checking if user is authorized or not
  const { user } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Router>
        <NavBar user={user}></NavBar>
        {/* {isAuthenticated && <UserOptions user={user} />} */}
        <Routes>
          <>
            <Route path="/" element={<Home />} />

            <Route path="/home" element={<Home />} />

            <Route path="/gold" element={<Gold />} />

            <Route path="/silver" element={<Silver />} />

            <Route path="/diamonds" element={<Diamonds></Diamonds>} />

            <Route path="/aboutus" element={<AboutUs />} />

            <Route path="/contactus" element={<ContactUs />} />

            <Route path="/ourservice" element={<OurService />} />

            <Route path="/jwellerybag" element={<JwellaryBag />} />

            <Route path="/jwellerybox" element={<JwelleryBox />} />

            <Route path="/jwellerymachine" element={<JwelleryMachine />} />

            <Route path="/menufactureitem" element={<MenufactureItem />} />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <ProductsList />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/product"
              element={
                <PrivateRoute>
                  <NewProduct />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/product/:id"
              element={
                <PrivateRoute>
                  <UpdateProduct></UpdateProduct>
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/accessories"
              element={
                <PrivateRoute>
                  <AccessoriesList />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/accessory"
              element={
                <PrivateRoute>
                  <NewAccessory />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/accessory/:id"
              element={
                <PrivateRoute>
                  <UpdateAccessory />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/units"
              element={
                <PrivateRoute>
                  <UnitPriceList></UnitPriceList>
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/unit"
              element={
                <PrivateRoute>
                  <NewUnit></NewUnit>
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/admin/unit/:id"
              element={
                <PrivateRoute>
                  <UpdateUnit></UpdateUnit>
                </PrivateRoute>
              }
            ></Route>

            <Route path="/products" element={<AllProducts />}></Route>

            <Route path="/product/:id" element={<ProductDetail />}></Route>

            <Route path="/product/:keyword" element={<AllProducts />}></Route>

            <Route path="/product/:category" element={<AllProducts />}></Route>

            <Route path="/login" element={<LoginPage></LoginPage>}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
