import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Main from './Components/HomePage/Main/Main';
import ProfilePage from './Components/HomePage/ProfilePage/ProfilePage';
import UserProfile from './Components/HomePage/ProfilePage/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/:id' element={<Main/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
        <Route path='/user/profile/:id/:uid' element={<UserProfile/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
