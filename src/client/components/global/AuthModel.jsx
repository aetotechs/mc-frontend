import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/context/AuthContext";
import api_urls from "../../utils/resources/api_urls";

import { ProgressBar } from "primereact/progressbar";

import CardLoadingSpinner from "./CardLoadingSpinner";

import { Divider } from "primereact/divider";

import { UserDetailsForm } from "../../AuthForms/UserDetails";
import { AdditionalUserDetailsForm } from "../../AuthForms/AdditionalUserDetails";

export default function AuthModel() {
  const { showAuth, dispatchAuth } = useAuth();
  const [AdditionalDetailsForm, showAdditionalDetailsForm] = useState(false);
  const [operation, setOperation] = useState({
    checkAccountStatus: true,
    isLogin: false,
    isRegister: false,
  });
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    console.log("handleNextStep");
    showAdditionalDetailsForm(!AdditionalDetailsForm);
  };

  const handlePreviousStep=()=>{
    showAdditionalDetailsForm(!AdditionalDetailsForm);

  }

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
          <div
            className="grid grid-cols-1 px-10 py-5 gap-1  bg-white rounded-md  lg:w-[35vw]"
          >
            <div className="absolute right-3 top-3">
              <div
                className="cursor-pointer pi pi-times"
                title="Close"
                onClick={() => dispatchAuth(false)}
              />
            </div>
            <span className="text-left font-bold text-[24px]">
              Welcome to MyCrib
            </span>
            <p className="flex text-base  ">
              <span className="font-normal text-[#62636C] ">Already have an account?</span>
              <span className="font-medium">Signin</span>
            </p>
            {!AdditionalDetailsForm ? (
              <>
                <div className="flex justify-between gap-5 bg-slate-200">
                  {/* <ProgressBar value={100}></ProgressBar>
            <ProgressBar value={0}></ProgressBar> */}
                </div>
                <UserDetailsForm handleClick={handleNextStep} />

                <div className="flex items-center gap-5">
                  <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
                  <span className="text-lg my-1 font-normal text-[#80828D]">or</span>
                  <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
                </div>

                <div className="flex border border-[#CDCED7] rounded-[8px] justify-around py-2 ">
                  <div className="w-5 h-5 object-cover">
                    <img src="/logos/google.png" alt="Google" />
                  </div>
                  <span className="font-medium">Continue with Google</span>
                </div>
              </>
            ) : (
              <>
                <AdditionalUserDetailsForm handleClick={handlePreviousStep} />
              </>
            )}

            {/*             
            <InputText
              value={user.email}
              onChange={handleInputChange}
              type="email"
              placeholder="email"
              required
              name="email"
              className="bg-white-alpha-20 rounded-none border hover:border-black p-3 text-primary-50"
            /> */}
            {/* <InputText
              value={user.fullName}
              onChange={handleInputChange}
              placeholder="full names"
              required
              name="fullName"
              className={`${!operation.isRegister && "hidden"} bg-white-alpha-20 rounded-none border hover:border-black p-3 text-primary-50`}
            /> */}
            {/* <Password
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="password"
              toggleMask
              inputClassName={`bg-white-alpha-20 rounded-none w-[75vw] md:w-[20vw] border hover:border-black p-3 text-primary-50`}
              className={`w-full ${!operation.isRegister && !operation.isLogin && "hidden"} `}
            /> */}
            {/* 
            <Button
              disabled={isLoading || !user.email}
              icon={isLoading && <CardLoadingSpinner color={"white"} />}
              label={
                isLoading
                  ? null
                  : operation.checkAccountStatus
                    ? "Continue"
                    : operation.isLogin
                      ? "Sign in"
                      : "Sign Up"
              }
              onClick={handleSubmit}
              className="bg-red-500 py-3 w-full text-white text-center"
            /> */}

            {/* <p
              className={`bg-green-100 text-sm text-green-700 p-3 truncate ${!success && "hidden"}`}
            >
              {JSON.stringify(success)}
            </p>

            <p className="text-center cursor-pointer text-sm font-[600] underline text-gray-300">
              Forgom password?
            </p> */}

            {/* <p align="center" className="text-gray-200 m-0 text-sm">
              ----------- Or Continue with -------------
            </p>

            <div className="text-center py-6">
              <div className="w-8 h-8 flex items-center cursor-pointer justify-center mx-auto my-auto">
                <img src="/icons/google.png" className="google-logo" alt="" />
              </div>
              <p className="text-[10px] text-red-400">Not yet available</p>
            </div> */}

            {/* <p className="text-center text-gray-300 text-sm">
              By continuing, you confirm that you‘re an adult and
              <br /> you’ve read and accepted our Nalmart
              <br /> Agreement and Privacy Policy.
            </p> */}
          </div>
        )}
      ></Dialog>
    </div>
  );
}
