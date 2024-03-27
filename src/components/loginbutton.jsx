import React from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../../firebaseconfig";
import { Button } from "./button";

export const LoginButton = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(() => {
      const errorMessage = error.message;
      // Tähän toaster
      alert(errorMessage);
    });
  };

  return <Button onClick={signIn} text="Login" />;
};

//export default Login;
