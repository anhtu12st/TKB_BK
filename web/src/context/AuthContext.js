import React, { createContext, useEffect, useReducer } from "react";
import { authReducer, initState, auth, db } from "../reducers/AuthReducer";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    const getLocalData = async () => {
      let data = await JSON.parse(localStorage.getItem("data"));
      if (data) {
        console.log("localDATA", data);
        dispatch({
          type: "CURRENT_USER",
          payload: { currentUser: data.currentUser, tkb: data.tkb },
        });
      }
    };
    const getData = async (user) => {
      if (user !== null) {
        const cityRef = db.collection("tkb").doc(user.uid);
        const doc = await cityRef.get();
        if (!doc.exists) {
          return null;
        } else {
          return JSON.parse(doc.data().data);
        }
      } else {
        return null;
      }
    };

    getLocalData();

    auth.onAuthStateChanged(async (user) => {
      const tkb = await getData(user);

      dispatch({
        type: "CURRENT_USER",
        payload: { currentUser: user, tkb },
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
