import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Navbar from './components/Dashboard/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navbar/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
