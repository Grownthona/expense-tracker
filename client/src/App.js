import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Navbar from './components/Dashboard/Navbar';
import Home from './components/Dashboard/Home';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';

function App() {
  const isAuthenticated = localStorage.getItem('token');
  
  if(isAuthenticated){
    console.log(isAuthenticated);
  }
  
  return (
    <div className="App">
      <Router>
        <Routes>
          {isAuthenticated ? 
            <Route path='/' element={<Navbar/>}></Route>
          :
            <Route path='/' element={<Home/>}></Route>
          }
          <Route path='/user/signin' element={<SignIn/>}></Route>
          <Route path='/user/signup' element = {<SignUp/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;