import React, { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { auth } from "../reducers/AuthReducer";

function Login() {
  const { data, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const currentUser = data.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    dispatch({ type: "REQUESTING" });
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: "LOGIN" });
    } catch (err) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        dispatch({ type: "LOGIN" });
      } catch (err2) {
        setLoading(false);
        setPassword("");
        setEmail("");
        setErr("Login failed ! Try again.");
      }
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      {currentUser && <Redirect to="/" />}
      <div className="login__email">
        <label>Mail:</label>
        <input
          className="login__input"
          autoFocus
          type="email"
          placeholder="email@hcmut.edu.vn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login__password">
        <label>Password:</label>
        <input
          className="login__input"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {loading && (
        <div className="spinner" style={{ width: "30px", marginBottom: 0 }}>
          <Loader type="Circles" color="#dd4488" height={30} width={30} />
        </div>
      )}
      {err && <div>{err}</div>}
      <button className="login__button">Login</button>
    </form>
  );
}

export default Login;
