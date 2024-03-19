import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Home from './components/Dashboard/Home';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Budget from './components/Budget/Budget';
import Expense from './components/Expense/Expense';
import Dashboard from './components/Dashboard/Dashboard';
import ExpenseTracking from './components/ExpenseTracking/ExpenseTracking';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  
  if(isAuthenticated){
    console.log(isAuthenticated);
  }
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/user/signin' element={<SignIn/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/user/signup' element = {<SignUp/>}></Route>
          <Route path='/budget' element = {<Budget/>}></Route>
          <Route path='/expense' element = {<Expense/>}></Route>
          <Route path='/trackexpense' element={<ExpenseTracking/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;