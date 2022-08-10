import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={
          <>
          <Header loggedIn={false}/> 
          <Main />
          <Footer />
          </>
        }
        />
        <Route path="/signin" element={ 
          <Login />
        } 
        />
        <Route path="/signup" element={ 
          <Register />
        } 
        />
        <Route path="/profile" element={ 
          <>
          <Header loggedIn={true} />
          <Profile />
          </>
        } 
        />
        <Route path="/movies" element={ 
          <>
          <Header loggedIn={true} />
          <Movies />
          <Footer />
          </>
        } 
        />
        <Route path="/saved-movies" element={ 
          <>
          <Header loggedIn={true} />
          <SavedMovies />
          <Footer />
          </>
        } 
        />
        <Route path="*" element={
          <NotFound />
        }
        />
      </Routes>
    </div>
  );
}

export default App;