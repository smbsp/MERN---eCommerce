import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';
import NotFound from '../pages/notFound/NotFound';
// import Loader from '../components/loader';
import useFetchData from '../hooks/useFetchData';
import ProductListing from '../pages/productListing/ProductListing';
import CartItems from '../pages/cartItems/CartItems';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import urlConfig from '../utils/urlConfig';
import useAuth from '../context/auth/useAuth';
const AppRoutes = () => {

  const {data: categories, error, isLoading } = useFetchData(urlConfig.CATEGORIES_URL, []);

  console.log(categories.data);

  const { user } = useAuth();
  console.log('APP routes user data->',user);
  return (
      <>
      
      {/* <Loader /> */}
        <Router>
          
            {/* { user && user.length ? <Header categories={categories.data} isLoading={isLoading}/> : <></>}  */}
            {
              user && Object.keys(user).length ? <Header categories={categories.data} isLoading={isLoading}/> : <></>
            }     
            
            <Routes>
                <Route path='/' element={<ProductListing />} />
                <Route path='/cart' element={<CartItems />} />
                <Route  path='/products/:categoryName' element={<ProductListing />}/>
                <Route path='*' element={<NotFound />} />
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
      </>
  )

}

export default AppRoutes;