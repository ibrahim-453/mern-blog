import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyEmail from './pages/VerifyEmail';
import ProfileDetail from './pages/ProfileDetail';
import WriteBlog from './pages/WriteBlog';
import PrivateRoute from './components/PrivateRoute';
import AllBlog from './pages/AllBlog';
import Profile from './components/Profile';
import UserBlog from './pages/UserBlog';
import EditBlog from './pages/EditBlog';
import ReadBlog from './pages/ReadBlog';
import ScrollTop from './components/ScrollTop';
import AdminBlog from './pages/AdminBlog';
import AdminUsers from './pages/AdminUsers';
import AdminComment from './pages/AdminComment';
import VerifyToken from './pages/VerifyToken';
import ChangePassword from './pages/ChangePassword';
function App() {
  return (
    <BrowserRouter>
    <ScrollTop />
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/blogs' element={<AllBlog />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route element={<PrivateRoute />}> 
            <Route element={<Profile />}>
               <Route path='/profile-details' element={<ProfileDetail />} /> 
               <Route path='/my-blogs' element={<UserBlog />} />
               <Route path='/all-blogs' element={<AdminBlog />} />
               <Route path='/all-users' element={<AdminUsers />} />
               <Route path='/all-comments' element={<AdminComment />} />
               <Route path='/verify-token' element={<VerifyToken />} />
               <Route path='change-password' element={<ChangePassword />} />
            </Route>
            <Route path='/edit-blog/:blogSlug' element={<EditBlog />} />
            <Route path='/write-blog' element={<WriteBlog />} />
            <Route path='/read-blog/:blogSlug' element={<ReadBlog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App