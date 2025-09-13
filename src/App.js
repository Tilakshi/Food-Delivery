import { ThemeProvider, Drawer } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import Index from "./Components/Index.jsx";

import { Routes, Route } from "react-router-dom";
import SpecialOffer from "./Components/SpecialOffer.jsx";
import Reviews from "./Components/Reviews.jsx";
import SignUp from "./Components/SignUp.jsx";
import LogIn from "./Components/LogIn.jsx";
import Bakery from "./Components/Bakery.jsx";
import Confectionary from "./Components/Confectionary.jsx";
import MealBoxes from "./Components/MealBoxes.jsx";
import Jams from "./Components/Jams.jsx";
import CustomOrders from "./Components/CustomOrders.jsx";
import ShopByKitchen from "./Components/ShopByKitchen.jsx";
import BecomeAChef from "./Components/BecomeAChefj.jsx";
import Help from "./Components/Help.jsx";
import Beverages from "./Components/Beverages.jsx";
import Traditional from "./Components/Traditional.jsx";
import FAQ from "./Components/FAQ.jsx";
import Delivary from "./Components/Delivary.jsx";
import IndexAfter from "./Components/IndexAfter.jsx";
import SellerdDashboard from "./Components/SellerDashboard.jsx";
import theme from "./Components/theme.js";
import NewOrdersSeller from "./Components/NewOrdersSeller.jsx";
import PastOrders from "./Components/PastOrders.jsx";
import CustomerFeedbacks from "./Components/CustomerFeedbacks.jsx";
import SellerMenu from "./Components/SellerMenu.jsx";
import SellerDashboardIndex from "./Components/SellerDashboardIndex.jsx";
import SellerProfile from "./Components/SellerProfile.jsx";
import SellerAddNewItem from "./Components/SellerAddNewItem.jsx";
import BuyerDashboard from "./Components/BuyerDashboard.jsx";
import BuyerDashboardIndex from "./Components/BuyerDashboardIndex.jsx";
import BuyerPostAreview from "./Components/BuyerPostAreview.jsx";
import Checkout from "./Components/Checkout.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="specialOffers" element={<SpecialOffer />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="menu" element={<Drawer />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="Bakery" element={<Bakery />} />
          <Route path="Confectionaty" element={<Confectionary />} />
          <Route path="mealBoxes" element={<MealBoxes />} />
          <Route path="jams" element={<Jams />} />
          <Route path="customOrders" element={<CustomOrders />} />
          <Route path="shopByKitchen" element={<ShopByKitchen />} />
          <Route path="becomeAChef" element={<BecomeAChef />} />
          <Route path="help" element={<Help />} />
          <Route path="beverages" element={<Beverages />} />
          <Route path="traditional" element={<Traditional />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="delivary" element={<Delivary />} />
          <Route path="indexN" element={<IndexAfter />} />
          <Route path="getAll/*" element={<AdminDashboard/>}/>

          <Route path="sellerDashboard/*" element={<SellerdDashboard />}>
            <Route index element={<SellerDashboardIndex />} />
            <Route path="sellerProfile" element={<SellerProfile />} />
            <Route path="newOrdersSeller" element={<NewOrdersSeller />} />
            <Route path="pastOrders" element={<PastOrders />} />
            <Route path="customerFeedbacks" element={<CustomerFeedbacks />} />
            <Route path="sellerMenu" element={<SellerMenu />} />
            <Route path="addNewItem" element={<SellerAddNewItem />} />
          </Route>

          <Route path="buyerDashboard/*" element={<BuyerDashboard />}>
            <Route index element={<BuyerDashboardIndex />} />
            <Route path="Confectionary" element={<Confectionary />} />
            <Route path="Bakery" element={<Bakery />} />
            <Route path="mealBoxes" element={<MealBoxes />} />
            <Route path="jams" element={<Jams />} />
            <Route path="customOrders" element={<CustomOrders />} />
            <Route path="shopByKitchen" element={<ShopByKitchen />} />
            <Route path="help" element={<Help />} />
            <Route path="beverages" element={<Beverages />} />
            <Route path="traditional" element={<Traditional />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="delivary" element={<Delivary />} />
            <Route path='postAReview' element={<BuyerPostAreview/>}/>
            <Route path="checkout" element={<Checkout />} /> 
          </Route>
        </Routes>

        
           
      </div>
    </ThemeProvider>
  );
}

export default App;
