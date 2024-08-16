import { Provider } from 'react-redux'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './router'
import {
  BrowserRouter as Router} from "react-router-dom"
import store from './store/store';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Router>
  )
}

export default App

