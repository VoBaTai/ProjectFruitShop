import React, { FC, useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import Input from "./components/Input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type LoginProps = {};

// eslint-disable-next-line no-empty-pattern
const Login: FC<LoginProps> = ({}) => {
  const usernameRef = React.useRef<any>();
  const passwordRef = React.useRef<any>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
        navigate("/");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);
  return (
    <>
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-primary">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill" /> Login
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHandler}>
                  <Input
                    inputRef={usernameRef}
                    id="txtUsername"
                    label="User Name:"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your username"
                    maxLength={50}
                  />
                  <Input
                    inputRef={passwordRef}
                    id="txtPassword"
                    label="Password:"
                    type="password"
                    placeholder="Enter your password"
                    maxLength={100}
                  />
                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      <button type="submit" className="btn btn-primary">
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
