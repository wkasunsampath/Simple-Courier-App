import React, { useContext, useEffect, useMemo, useState } from "react";
import { ChildrenProps } from "../utils/types";
import BaseLayout from "../components/BaseLayout";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthProvider";

export const UiContext = React.createContext<
  | {
      isLoading: boolean;
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

UiContext.displayName = "UiContext";

export const UiProvider = ({ children }: { children: ChildrenProps }) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
    };
  }, [isLoading]);

  useEffect(() => {
    if (router.route.includes("user") && auth?.loggedUser?.type !== "USER") {
      router.push("/");
    }
    if (router.route.includes("admin") && auth?.loggedUser?.type !== "ADMIN") {
      router.push("/");
    }
    if (!router.route.includes("user") && !router.route.includes("admin") && auth?.isLoggedIn) {
      if (auth.loggedUser?.type === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  }, [router.route]);

  return (
    <UiContext.Provider value={value}>
      <BaseLayout>{children}</BaseLayout>
    </UiContext.Provider>
  );
};
