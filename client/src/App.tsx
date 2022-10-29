import Navbar from './components/navbar/Navbar';
import store from './redux/store/store';
import { Provider } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import SignupComponent from "./components/signup/SignupComponent";
import LoginComponent from './components/login/LoginComponent';
import AuthCheck from './assets/auth-asset/AuthCheck';
import { Navigate } from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
        <header>      
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="account" element={<></>}></Route>
            <Route path="/login" element={AuthCheck() ? <Navigate to={'/'} /> : <LoginComponent />}></Route>
            <Route path="register" element={<SignupComponent />}></Route>
          </Routes>
        </main>
        <footer>
          <></>
        </footer>
      </Provider>
  );
}

export default App;
