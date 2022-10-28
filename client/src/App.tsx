import Navbar from './components/navbar/Navbar';
import store from './redux/store/store';
import { Provider } from "react-redux"
import { Routes, Route } from 'react-router-dom';
import SignupComponent from "./components/signup/SignupComponent";

function App() {
  return (
      <Provider store={store}>
        <header>      
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="account" element={<></>}></Route>
            <Route path="/login" element={<></>}></Route>
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
