import './styles/main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from './pages/Home'
import History from './pages/History'

function App() {
  return (
    <div className="App">
      <header>
        <span>R</span>EATHER
      </header>
      <Router>
        <div>
          <nav className="menu">
            <ul>
              <li>
                <NavLink exact to="/" activeClassName="current-page">Home</NavLink>
              </li>
              <li>
                <NavLink exact to="/history" activeClassName="current-page">History</NavLink>
              </li>
            </ul>
          </nav>
  
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/history">
              <History />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
