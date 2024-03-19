"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const { setAuthStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    appwriteService.logout().then(() => {
      setAuthStatus(false);
      router.replace("/")
    });
  },[]);

  return <></>;
};

export default LogoutPage;
