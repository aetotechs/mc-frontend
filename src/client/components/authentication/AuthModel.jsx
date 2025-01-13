import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useAuth } from "../../utils/context/AuthContext";
import api_urls from "../../utils/resources/api_urls";
import { SignUp } from "./auth_forms/SignUp";
import { Login } from "./auth_forms/LogIn";

export default function AuthModel() {
  const { showAuth, dispatchAuth } = useAuth();

  const [operation, setOperation] = useState({
    checkAccountStatus: false,
    isLogin: false,
    isRegister: true,
  });
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const url = operation.checkAccountStatus
      ? api_urls.users.check_account(user.email)
      : operation.isLogin
        ? api_urls.users.login
        : api_urls.users.register;

    const payload = operation.isLogin
      ? { email: user.email, password: user.password }
      : user;

    console.log("Payload:", payload);
    operation.checkAccountStatus
      ? checkAccountStatus(url)
      : operation.isLogin
        ? login(url, payload)
        : register(url, payload);
  };

  const checkAccountStatus = async (url) => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        let accountStatus = await response.json();
        if (accountStatus.available) {
          if (accountStatus.verified) {
            setOperation({
              checkAccountStatus: false,
              isLogin: true,
              isRegister: false,
            });
          } else {
            setError("Account Unverified");
          }
        } else {
          setOperation({
            checkAccountStatus: false,
            isLogin: false,
            isRegister: true,
          });
        }
      } else {
        setError(await response.text());
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (url, data) => {
    const logins = { username: data.email, password: data.password };
    console.log(logins);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logins),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAuthUser(data.user);
        setUserToken(data.token);
        setSuccess("Success, closing the form");
        setTimeout(() => {
          dispatchAuth(false);
          handleRefresh();
        }, 2000);
      } else {
        setError(await response.text());
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let resData = await response.text();
      if (response.ok) {
        let data = await response.text();
        setSuccess(resData);
      } else {
        setError(resData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setError("");
    setSuccess("");
    setUser({ fullName: "", email: "", password: "" });
    setOperation({
      checkAccountStatus: true,
      isLogin: false,
      isRegister: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="card flex justify-center">
      <Dialog
        visible={showAuth}
        onHide={() => {
          if (!showAuth) return;
          dispatchAuth(false);
        }}
        content={({ hide }) => (
          <div className="grid grid-cols-1 px-8 py-10 gap-1 bg-white rounded-md lg:w-[32vw]">
            <div className="absolute right-3 top-3">
              <div
                className="cursor-pointer pi pi-times text-xl"
                title="Close"
                onClick={() => dispatchAuth(false)}
              />
            </div>

            {operation.isRegister && <SignUp />}
            {operation.isLogin && <Login />}
          </div>
        )}
      ></Dialog>
    </div>
  );
}
