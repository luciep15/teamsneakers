import logo from './logo.svg';
import './App.css';
import Header from './containers/header';
import Footer from './containers/footer';
import Home from './containers/home';
import Register from './containers/user/register';
import Login from './containers/user/login';
import Logout from './containers/user/logout';
import Forgot from './containers/user/forgot';
import Profil from './containers/profil';
import AddProduct from './containers/admin/product/addProduct';
import EditProduct from './containers/admin/product/editProduct';
import Admin from './containers/admin/admin';
import New from './containers/new';
import ProductHomme from './containers/homme';
import ProductFemme from './containers/femme';
import ProductEnfant from './containers/enfant';
import ProductGirls from './containers/girls';
import ProductBoys from './containers/boys';
import Detail from './containers/detail';
import Basket from './containers/basket';
import Payment from './containers/payment';
import Success from './containers/success';
import Order from './containers/orders';
import OrderDetail from './containers/orderDetail';
import Favorite from './containers/favorite';
import {Route, Routes} from "react-router-dom";
import RequireDataAuth from './helpers/require-data-auth';


function App() {
  return (
    <div className="App">

    <Header/>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/register" element={<Register />}/>
    <Route exact path="/login" element={<Login />}/>
    <Route exact path="/logout" element={<RequireDataAuth child={Logout} auth={true} />}/>
    <Route exact path="/forgot" element={<Forgot />} />
    <Route exact path="/profil" element= {<RequireDataAuth child={Profil} auth={true}/>}/>
    <Route exact path="/admin" element= {<RequireDataAuth child={Admin} auth={true}/>}/>
    <Route exact path="/addProduct" element= {<RequireDataAuth child={AddProduct} auth={true}/>}/>
    <Route exact path="/editProduct/:id" element= {<RequireDataAuth child={EditProduct} auth={true}/>}/>
    <Route exact path="/new" element={<New />}/>
    <Route exact path="/homme" element={<ProductHomme />}/>
    <Route exact path="/femme" element={<ProductFemme />}/>
    <Route exact path="/enfant" element={<ProductEnfant />}/>
    <Route exact path="/girls" element={<ProductGirls />}/>
    <Route exact path="/boys" element={<ProductBoys />}/>
    <Route exact path="/detail/:id" element={<Detail />}/>
    <Route exact path="/basket" element={<Basket />}/>
    <Route exact path="/payment/:orderId" element= {<RequireDataAuth child={Payment} auth={true}/>}/>
    <Route exact path="/success" element= {<RequireDataAuth child={Success} auth={true}/>}/>
    <Route exact path="/orders" element= {<RequireDataAuth child={Order} auth={true}/>}/>
    <Route exact path="/orderDetail/:orderId" element= {<RequireDataAuth child={OrderDetail} auth={true}/>}/>
    <Route exact path="/favorite" element={<Favorite />}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
