import Axios from 'axios';

export const BASE = 'http://127.0.0.1:4000//api/v1/';
export const DEST = 'destinations';
export const FAV = 'favorites';
export const USERS = 'users';
export const AUTH = 'auth';

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = BASE;

export const createNewUser = (data, createUser, setError) => {
  Axios
    .post(`${USERS}`, { ...data })
    .then(result => {
      createUser(result.data);
    })
    .catch(() => setError(true));
}

export const logInUser = (data, logIn, setError) => {
  Axios
    .post(`${AUTH}/login`, data)
    .then(result => {
      logIn(result.data);
    })
    .catch(() => setError(true));
}

export const logOutUser = (logOut, push) => {
  Axios
    .delete(`${AUTH}/logout`)
    .then(() => {
      logOut();
      push('/login');
    });
}

export const removeFav = (favId, removeFavorite, setError) => {
  Axios
    .delete(`${FAV}/${favId}`)
    .then(() => {
      removeFavorite(favId);
    })
    .catch(() => setError());
}

export const markFavorite = (data, logIn, setError) => {
  Axios
    .post(`${FAV}`, { ...data })
    .then(result => {
      logIn(result.data);
    })
    .catch(() => {
      setError(true);
    });
}

export const getDestinations = (changeDestinations, setError) => {
  Axios
    .get(`${DEST}`)
    .then(result => {
      changeDestinations(result.data.destinations);
    })
    .catch(() => {
      setError(true);
    });
}

export const checkConnection = (user, logIn, logOut, setError) => {
  Axios
    .get(`${AUTH}/connected`)
    .then(result => {
      if (result.data.connected && !user.connected) {
        logIn(result.data);
      } else if (!result.data.connected && user.connected) {
        logOut();
      }
    })
    .catch(() => setError());
}

export const getDestination = (id, setDestination, setError) => {
  Axios
    .get(`${DEST}/${id}`)
    .then(result => {
      setDestination(result.data.destination);
    })
    .catch(setError());
}

export const saveNewDest = (data, addDestination, setError) => {
  Axios
    .post(`${DEST}`, { ...data })
    .then(result => {
      addDestination(result.data.destination);
    })
    .catch(() => setError(true));
}

export const updateDest = (id, data, updateDestinations, setError) => {
  Axios
    .put(`${DEST}/${id}`, { ...data })
    .then(result => {
      updateDestinations(result.data.destination);
    })
    .catch(() => setError(true));
}

export const deleteDest = (id, removeDestination, setError) => {
  Axios
    .delete(`${DEST}/${id}`)
    .then(() => removeDestination(id))
    .catch(() => setError(true));
}
