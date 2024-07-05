import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "../utils/FirebaseConfig";

import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { ImTextColor } from "react-icons/im";

export default function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  useEffect(() => {
    console.log({ userInfo });
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser, router]);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, {
          email,
        });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "Available",
            },
          });
          router.push("/onboarding");
        } else {
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.data.id,
              email: data.data.email,
              name: data.data.name,
              profileImage: data.data.profilePicture,
              status: data.data.about,
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div classname = "flex" style = {{backgroundColor: '#000000'} }>
    <div classname = "flex" style = {{backgroundImage: 'url("chatbg2.png")',backgroundRepeat: 'no-repeat',backgroundSize:'contain', backgroundPosition: 'center'}}>
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-6" style={{ backgroundImage: 'url("")',backgroundRepeat: 'no-repeat', backgroundSize: 500, backgroundPosition: 'center',opacity: 50 }}>
      <div className="flex items-center justify-center gap-2 text-white">
      <span className="text-7xl font-bold">
      <span style={{ color: '#ff6b6b', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>Super</span>
      <span style={{ color: '#74c0fc', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>Chat</span>
    </span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={login}
        style={{backgroundSize: 'cover', backgroundPosition: 'center', marginTop: 250 }}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
    </div>
    </div>
  );
}
