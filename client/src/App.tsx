import Navbar from './components/navbar/Navbar';
import store from './redux/store/store';
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar/>
      </div>
    </Provider>
  );
}

export default App;
