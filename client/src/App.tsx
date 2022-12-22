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
import { fetchUser } from './components/features/user/userSlice';
import CreateBlogPage from './pages/CreateBlog/CreateBlog';

function App() {
  
  const dispatch: any = useAppDispatch()
  const Login = useAppSelector((state) => state.login)

  useEffect(() => {
    if (Login.loading === false && Login.status === "failed" && Login.method === "fetchUser") {
      dispatch(setMethod("idle"))
      dispatch(setStatus("idle"))
      dispatch(setLogin(false))
    }
    else if (Login.loading === false && Login.status === "succeeded" && Login.method === "fetchUser") {
      dispatch(setMethod("idle"))
      dispatch(setStatus("idle"))
      dispatch(setLogin(true))
    }
  }, [Login])

  useEffect(() => {
    console.log("href change one")
    dispatch(checkLogin({}))
  }, [window.location.href])

  useEffect(() => {
    console.log("render one")
    dispatch(checkLogin({}))
  }, [])

  return (
        <Routes>
          <Route path="account" element={<></>}></Route>
          <Route path="/login" element={Login.login ? <Navigate to={'/'} /> : <LoginPage />}></Route>
          <Route path="/register" element={Login.login ? <Navigate to={'/'} /> : <SignupPage />}></Route>
          <Route path="/name" element={Login.login ? <UserDetails /> : <Navigate to={'/login'} />}></Route>
          <Route path="/myposts" element={Login.login ? <Navbar /> : <Navigate to={'/login'} />}></Route>
          <Route path='/accountVerification' element={<EmailVerification />}></Route>
          <Route path='/createblog' element={<CreateBlogPage />}></Route>
          <Route path='/' element={<Homepage />}></Route>
        </Routes>
  );
}

export default App;
