import { SignupType } from "@manujdixit/blogtrain-common";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setpostInputs] = useState<SignupType>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      console.log(postInputs);
      const response = await axios.post(
        type === "signup"
          ? `${BACKEND_URL}/api/v1/user/signup`
          : `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/welcome");
    } catch (error: any) {
      if (error.response) {
        if (error.response.status) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("Network error, please try again.");
      }
    }
  }

  return (
    <>
      <ToastContainer position="top-center" stacked draggable />
      <div className="px-10 h-screen flex justify-center flex-col items-center">
        <div className="flex justify-center flex-col xl:max-w-screen-sm">
          <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-2 font-libre">
            {type === "signin" ? (
              <div>Welcome back!</div>
            ) : (
              <div>Unleash Your Creativity with Our Blog Platform</div>
            )}
          </div>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mb-5">
            {type === "signin" ? (
              <div>
                Sign in to your account and start exploring the world of
                inspiration.
              </div>
            ) : (
              <div>
                Discover a world of inspiration, share your thoughts, and
                connect with like-minded individuals on our blog platform.
              </div>
            )}
          </p>
          <div className="mb-4 space-y-4">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                onChange={(e) => {
                  setpostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Username"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Email"
              type="email"
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              type={"password"}
              onChange={(e) => {
                setpostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Button onClick={sendRequest} color="primary" className="min-w-96">
              {type === "signup" ? "Sign up" : "Sign in"}
            </Button>
          </div>
          <div className="text-slate-400 mt-2">
            {type === "signup"
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to={type === "signup" ? "/dashboard" : "/dashboard"}
              className="underline"
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

interface LabelledInput {
  type?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ type, label, onChange }: LabelledInput) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        className="max-w-96"
        type={type || "text"}
        label={label}
        onChange={onChange}
        required
      />
    </div>
  );
}
