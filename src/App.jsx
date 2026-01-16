import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AllBooks from "./pages/AllBooks"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import AboutUs from "./pages/AboutUs"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookDetails from './components/BookDetails/BookDetails'
import { useDispatch, useSelector } from 'react-redux'
import auth, { authActions } from "./store/auth"
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import AllOrders from './components/Profile/AllOrders'
import AddBook from './components/Profile/AddBook'
import Settings from './components/Profile/Settings'
import UpdateBook from './pages/UpdateBook'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  })
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/view-book-details/:id" element={<BookDetails />} />
        <Route path="/login" element={!isLoggedIn ? <LogIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        >
          <Route
            index
            element={role === "admin" ? <AllOrders /> : <Favourites />}
          />
          <Route path="order-history" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />

          {role === "admin" && (
            <Route path="add-book" element={<AddBook />} />
          )}
        </Route>

        {role === "admin" && (
          <Route path="/update-book/:id" element={<UpdateBook />} />
        )}

        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App
