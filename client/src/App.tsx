import { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import UserDetails from './components/user_details/UserDetails';
import AuthCheck from './helper/AuthCheck';
import { Navigate } from "react-router-dom";
import Homepage from './pages/HomePage/Homepage';
import SignupPage from './pages/SignupPage/SignupPage';
import EmailVerification from './pages/EmailVerification/EmailVerification';
import { useAppSelector, useAppDispatch } from './components/app/hooks';
import { setMethod, setLogin, setStatus, checkLogin } from './components/features/login/loginSlice';
// import { fetchUser, fetchUserDetails } from './components/features/user/userSlice';
import CreateBlogPage from './pages/CreateBlog/CreateBlog';
import MyPosts from './pages/MyPosts/MyPosts';
import { fetchUserDetails } from './components/features/user/userSlice';
import BlogPage from './pages/BlogPage/BlogPage';
import AllPosts from './pages/AllPosts/AllPosts';
import EditPost from './pages/EditBlog/EditPost';

function App() {
  
  const dispatch: any = useAppDispatch()
  const Login = useAppSelector((state) => state.login)
  const User = useAppSelector((state) => state.user)

  //------------------------------------------------------------------------------------------------------------
  //when it render first time, do the jwt verify to get the user details
  //------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    console.log("to do, when the page refreshes (app component renders for the first time")
    dispatch(fetchUserDetails({}))
  }, [])

  useEffect(() => {
    if (User.loading === false && User.status === "succeeded" && User.method === "fetchingUserDetails") {
      dispatch(setLogin(true))
      dispatch(setMethod("idle"))
      dispatch(setStatus("succeeded"))
    }
    else if (User.loading === false && User.status === "failed" && User.method === "fetchingUserDetails") {
      dispatch(setLogin(false))
      dispatch(setMethod("idle"))
      dispatch(setStatus("failed"))
    }
  }, [User])


  return (
        <Routes>
          <Route path="account" element={<></>}></Route>
          <Route path="/login" element={Login.login ? <Navigate to={'/'} /> : <LoginPage />}></Route>
          <Route path="/register" element={Login.login ? <Navigate to={'/'} /> : <SignupPage />}></Route>
          <Route path="/name" element={Login.login ? <UserDetails /> : <Navigate to={'/login'} />}></Route>
          <Route path="/myposts" element={Login.login ? <MyPosts /> : <Navigate to={'/login'} />}></Route>
          <Route path='/accountVerification' element={<EmailVerification />}></Route>
          <Route path='/createblog' element={<CreateBlogPage />}></Route>
          <Route path='/blog/:id' element={<BlogPage />}></Route>
          <Route path='/allposts' element={<AllPosts />}></Route>
          <Route path='/editpost/:id' element={<EditPost />}></Route>
          <Route path='/' element={<Homepage />}></Route>
        </Routes>
  );
}

export default App;
