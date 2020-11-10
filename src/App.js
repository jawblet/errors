import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
   <Router>
     <Switch>
        <Route exact path="/" component={Register}/>
        <Route path="/home" component={Home}/>
        <Route component={NotFound}/>
      </Switch>
   </Router>
  );
}

export default App;
