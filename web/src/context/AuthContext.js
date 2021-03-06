import React, { createContext, useEffect, useReducer } from "react";
import { authReducer, initState, auth, db } from "../reducers/AuthReducer";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    const getLocalData = async () => {
      let data = await JSON.parse(localStorage.getItem("data"));
      if (data) {
        dispatch({
          type: "CURRENT_USER",
          payload: { currentUser: data.currentUser, tkb: data.tkb },
        });
      }
    };
    const getData = async (user) => {
      if (user !== null) {
        const doc_ref = await db.collection("tkb").doc(user.uid);
        const doc = await doc_ref.get();
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
      console.log({ currentUser: user, tkb })
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
