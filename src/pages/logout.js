import { removeTocken } from "@/Actions/TokenInitilizer";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const logout = () => {
  const router = useRouter();
  useEffect(() => {
    removeTocken();
    router.push("/");
  });
  return null;
};

export default logout;
