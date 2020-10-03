import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA54itehR1_xpTBWW9ES4-vFhGeGz8Iet0",
  authDomain: "tkbbachkhoa.firebaseapp.com",
  databaseURL: "https://tkbbachkhoa.firebaseio.com",
  projectId: "tkbbachkhoa",
  storageBucket: "tkbbachkhoa.appspot.com",
  messagingSenderId: "716822316909",
  appId: "1:716822316909:web:b5e831ac31ff3a8005bc64",
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
      auth.signOut();
      return state;
    case "CURRENT_USER":
      if (action.payload.currentUser !== null)
        return {
          status: "login",
          data: {
            currentUser: action.payload.currentUser,
            tkb: action.payload.tkb,
          },
          error: null,
        };
      else
        return {
          status: "logout",
          data: {
            currentUser: null,
            tkb: null,
          },
          error: null,
        };
    default:
      return state;
  }
};
