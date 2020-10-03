import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const [loading, setLoading] = useState(true);
  const { data, dispatch } = useContext(AuthContext);

  const currentUser = data.currentUser;
  const tkb = data.tkb;

  if (!currentUser) {
    setTimeout(() => setLoading(false), 3000);
  }

  return (
    <div>
      {!currentUser && !loading ? <Redirect to="/login" /> : null}
      <div className="header__container">
        <div className="logo">
          <img src="./image/Logo BK.png" alt="Logo BK" />
        </div>
        {currentUser ? (
          <div className="responsive">
            <div>Welcumm {currentUser.email}</div>
            <div>Last update: {tkb["ngay_cap_nhat"]}</div>
          </div>
        ) : loading ? null : (
          <div className="responsive">Login to see TKB</div>
        )}
        <ul>
          <li>
            <Link className="responsive" to="/">
              h0m3Pa9e
            </Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch({
                      type: "LOGOUT",
                    });
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : loading ? null : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
