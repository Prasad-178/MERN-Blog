import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { Navigate } from "react-router-dom";
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import EmailVerification from './pages/EmailVerification';
import { useAppSelector, useAppDispatch } from './components/app/hooks';
import { setMethod, setLogin, setStatus, checkLogin } from './components/features/login/loginSlice';
import CreateBlogPage from './pages/CreateBlog';
import MyPosts from './pages/MyPosts';
import { fetchUserDetails } from './components/features/user/userSlice';
import BlogPage from './pages/BlogPage';
import AllPosts from './pages/AllPosts';
import EditPost from './pages/EditPost';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import AccountPage from './pages/Account';

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
          <Route path="/account" element={Login.login ? <AccountPage /> : <Navigate to={'/login'} />}></Route>
          <Route path="/login" element={Login.login ? <Navigate to={'/'} /> : <LoginPage />}></Route>
          <Route path="/register" element={Login.login ? <Navigate to={'/'} /> : <SignupPage />}></Route>
          <Route path="/myposts" element={Login.login ? <MyPosts /> : <Navigate to={'/login'} />}></Route>
          <Route path='/accountVerification' element={<EmailVerification />}></Route>
          <Route path='/createblog' element={Login.login ? <CreateBlogPage /> : <Navigate to={'/login'} />}></Route>
          <Route path='/blog/:id' element={<BlogPage />}></Route>
          <Route path='/allposts' element={<AllPosts />}></Route>
          <Route path='/editpost/:id' element={Login.login ? <EditPost /> : <Navigate to={'/login'} />}></Route>
          <Route path='/resetpassword' element={<ResetPassword />}></Route>
          <Route path='/setnewpassword' element={<SetNewPassword />}></Route>
          <Route path='/' element={<Homepage />}></Route>
        </Routes>
  );
}

export default App;
