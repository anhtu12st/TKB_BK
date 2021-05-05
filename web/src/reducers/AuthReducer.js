import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdoRQK51lsDJLjLwwIpzFaruIhYRoTvyY",
  authDomain: "tkbbk-d4b8f.firebaseapp.com",
  projectId: "tkbbk-d4b8f",
  storageBucket: "tkbbk-d4b8f.appspot.com",
  messagingSenderId: "725846585020",
  appId: "1:725846585020:web:2ad63637896efd96ca2ab9",
  measurementId: "G-C2S4F8BJ3S"
};

app.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

export const initState = {
  status: "loading",
  tkb: null,
  data: { currentUser: null },
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "REQUESTING":
      return {
        ...state,
        status: "loading",
      };
    case "LOGIN":
      return state;
    case "LOGOUT":
      localStorage.removeItem("data");
      console.log(localStorage.getItem("data"));
      auth.signOut();
      return state;
    case "CURRENT_USER":
      if (action.payload.currentUser !== null) {
        let json = action.payload;
        localStorage.setItem("data", JSON.stringify(json));
        return {
          status: "login",
          data: {
            currentUser: action.payload.currentUser,
            tkb: action.payload.tkb,
          },
          error: null,
        };
      } else {
        return {
          status: "logout",
          data: {
            currentUser: null,
            tkb: null,
          },
          error: null,
        };
      }
    default:
      return state;
  }
};
