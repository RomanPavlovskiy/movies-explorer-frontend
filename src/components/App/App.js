import React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import MainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          if (res) {
            setCurrentUser({ name: res.name, email: res.email, id: res._id });
          }
        })
        .catch((err) => {
          console.log(`Ошибка проверки токена: ${err}`);
          setLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem("savedMovies")) {
        setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
      } else {
        getSavedMovies();
      }
    }
  }, [loggedIn]);

  function checkError(err) {
    if (err === "Ошибка: 401") {
      setStatusMessage("Вы ввели неправильный логин или пароль.");
    } else if (err === "Ошибка: 409") {
      setStatusMessage("Пользователь с таким email уже существует.");
    } else if (err === "Ошибка: 400") {
      setStatusMessage("Переданы некорректные данные.");
    } else {
      setStatusMessage(err);
    }
  }

  function setDataInfo() {
    const jwt = localStorage.getItem("jwt");
    MainApi.checkToken(jwt)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, id: res._id });
      })
      .catch((err) => {
        checkError(err);
      });
  }

  function handleRegisterSubmit(name, email, password) {
    setShowPreloader(true);
    MainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLoginSubmit(email, password);
          setStatusMessage("");
          navigate("/movies");
        }
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => setShowPreloader(false));
  }

  function handleLoginSubmit(email, password) {
    setShowPreloader(true);
    MainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setDataInfo();
          setStatusMessage("");
          navigate("/movies");
        }
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function editProfile({ name, email }) {
    MainApi.editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setStatusMessage("Данные пользователя обновлены!");
        setTimeout(() => {
          setStatusMessage("");
        }, 4000);
      })
      .catch((err) => {
        checkError(err);
      });
  }

  const handleSignOut = () => {
    MainApi.logout()
      .then((res) => {
        if (res) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("savedFilteredMovies");
          localStorage.removeItem("savedInputSearch");
          localStorage.removeItem("savedShort");
          localStorage.removeItem("savedMovies");
          localStorage.removeItem("beatFilmMovies");
          localStorage.removeItem("beatFilmInputSearch");
          localStorage.removeItem("beatFilmFilteredMovies");
          localStorage.removeItem("beatFilmShort");
          setCurrentUser({});
          setLoggedIn(false);
          navigate("/");
        }
      })
      .catch((err) => {
        checkError(err);
      });
  };

  function updateSavedMovies(savedMovies) {
    setSavedMovies(savedMovies);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }

  function getSavedMovies() {
    setShowPreloader(true);
    MainApi.getMovies()
      .then((data) => {
        updateSavedMovies(data);
        setIsSearchError(false);
      })
      .catch((err) => {
        setIsSearchError(true);
        checkError(err);
      })
      .finally(() => setShowPreloader(false));
  }

  function saveMovie(card) {
    const isSaved = savedMovies?.some((i) => i.movieId === card.id);
    if (!isSaved) {
      MainApi.saveMovie(card)
        .then((newMovie) => {
          updateSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((err) => {
          checkError(err);
        });
    } else {
      const id = savedMovies.find((i) => i.movieId === card.id)._id;
      MainApi.deleteMovie(id)
        .then(() => {
          updateSavedMovies(
            savedMovies.filter((card) => (card._id === id ? null : card))
          );
        })
        .catch((err) => {
          checkError(err);
        });
    }
  }

  function deleteMovie(card) {
    const id = card._id;
    MainApi.deleteMovie(id)
      .then(() => {
        updateSavedMovies(
          savedMovies.filter((card) => (card._id === id ? null : card))
        );
      })
      .catch((err) => {
        checkError(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={false} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLoginSubmit}
                statusMessage={statusMessage}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegisterSubmit}
                statusMessage={statusMessage}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Header loggedIn={true} />
                <Profile
                  component={Profile}
                  onClick={handleSignOut}
                  editProfile={editProfile}
                  loggedIn={loggedIn}
                  currentUser={currentUser}
                  statusMessage={statusMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Header loggedIn={true} />
                <Movies
                  savedMovies={savedMovies}
                  saveMovie={saveMovie}
                  getMovies={getSavedMovies}
                  loggedIn={loggedIn}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute>
                <Header loggedIn={true} />
                <SavedMovies
                  loggedIn={loggedIn}
                  cards={savedMovies}
                  showPreloader={showPreloader}
                  getMovies={getSavedMovies}
                  isSearchError={isSearchError}
                  deleteMovie={deleteMovie}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
