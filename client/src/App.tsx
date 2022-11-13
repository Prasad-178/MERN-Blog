import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import UserDetails from './components/user_details/UserDetails';
import AuthCheck from './assets/auth-asset/AuthCheck';
import { Navigate } from "react-router-dom";
import Homepage from './pages/HomePage/Homepage';
import SignupPage from './pages/SignupPage/SignupPage';
import EmailVerification from './pages/EmailVerification/EmailVerification';

function App() {
  return (
        <Routes>
          <Route path="account" element={<></>}></Route>
          <Route path="/login" element={AuthCheck() ? <Navigate to={'/'} /> : <LoginPage />}></Route>
          <Route path="/register" element={AuthCheck() ? <Navigate to={'/'} /> : <SignupPage />}></Route>
          <Route path="/name" element={AuthCheck() ? <UserDetails /> : <Navigate to={'/login'} />}></Route>
          <Route path="/myposts" element={AuthCheck() ? <Navbar /> : <Navigate to={'/login'} />}></Route>
          <Route path='/accountVerification' element={<EmailVerification />}></Route>
          <Route path='/' element={<Homepage />}></Route>
        </Routes>
  );
}

export default App;
