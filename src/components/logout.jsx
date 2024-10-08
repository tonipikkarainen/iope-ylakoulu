import React from "react";
import { auth } from "../../firebaseconfig";
import { useRouter } from "next/router";
import { Button } from "./button";

export const Logout = () => {
  const router = useRouter();

  const logOut = async () => {
    if (auth.currentUser) {
      await auth.signOut();
      await router.push(`/`, undefined, { shallow: true });
      /* router.push(`/`, undefined, { shallow: true });

      // Force a full reload of the page*/
      window.location.reload(true);
    }
  };

  return <Button onClick={logOut} text="Logout" />;
};
