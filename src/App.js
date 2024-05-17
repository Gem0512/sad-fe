import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './Home';
import AllBook from './components/books/AllBook';
import Login from './components/user/Login';
import Register from './components/user/Register';
import AddBook from './components/books/AddBook';
import Login1 from './components/user/Login1';
import AddCategory from './components/books/AddCategory';
import AllCategory from './components/books/AllCategory';
import CategoryDetail from './components/clothes/CategoryDetail';
import AllMobiles from './components/mobiles/AllMobiles';
import AllProduct from './components/products/AllProduct';
import AllClothes from './components/clothes/AllClothes';
import Category_Branch from './components/clothes/Category_Branch';
import AddAuthor from './components/books/AddAuthor';
import AddPublisher from './components/books/AddPublisher';
import AddClothes from './components/clothes/AddClothes';
import AddCategoryClothes from './components/clothes/AddCategoryClothes';
import AddBranch from './components/clothes/AddBranch';
import AddBranchMobile from './components/mobiles/AddBranchMobile';
import AddMobile from './components/mobiles/AddMobile';
import AllBranchMobile from './components/mobiles/AllBranchMobile';
import Author_Publisher from './components/books/Author_Publisher';
import Profile from './components/user/Profile';
import Cart from './components/cart/Cart';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Define your routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/loginManager" element={<Login1 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/allbooks" element={<AllBook />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/addcategory" element={<AddCategory />} />
      <Route path="/allcategory" element={<AllCategory />} />
      <Route path="/categorydetail/:id" element={<CategoryDetail />} />
      <Route path="/allmobiles" element={<AllMobiles />} />
      <Route path="/allproduct" element={<AllProduct />} />
      <Route path="/allclothes" element={<AllClothes />} />
      <Route path="/cate&branch" element={<Category_Branch />} />
      <Route path="/addbookauthor" element={<AddAuthor />} />
      <Route path="/addbookpublisher" element={<AddPublisher />} />
      <Route path="/addclothes" element={<AddClothes />} />
      <Route path="/addclothescategory" element={<AddCategoryClothes />} />
      <Route path="/addclothesbranch" element={<AddBranch />} />
      <Route path="/addmobilebranch" element={<AddBranchMobile />} />
      <Route path="/addmobile" element={<AddMobile />} />
      <Route path="/allbranchmobile" element={<AllBranchMobile />} />
      <Route path="/author&publisher" element={<Author_Publisher />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
