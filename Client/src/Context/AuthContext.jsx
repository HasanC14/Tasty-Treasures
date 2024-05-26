import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../../Firebase/firebase";
import axios from "axios";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();
export const UseAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Coin, setCoin] = useState(false);
  const [savedUser, setSavedUser] = useState(null);

  // Function to login with Google
  const LoginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  // Function to logout
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Register user info in database
  const RegisterWithCoin = () => {
    const user = {
      name: currentUser?.displayName,
      email: currentUser?.email,
      profileImage: currentUser?.photoURL,
    };
    if (currentUser) {
      axios
        .put(
          "https://tastytresures-hasanc14s-projects.vercel.app/registerUser",
          user
        )
        .then((res) => {
          setSavedUser(res.data);
        });
    }
  };

  // Get user data from the backend
  const GetUserData = async () => {
    if (currentUser) {
      try {
        const res = await axios.get(
          `https://tastytresures-hasanc14s-projects.vercel.app/user?email=${currentUser?.email}`
        );
        setSavedUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Effect to fetch user data when currentUser or Coin changes
  useEffect(() => {
    if (currentUser) {
      GetUserData();
    }
  }, [currentUser, Coin]);

  // Effect to initialize the user on auth state change
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => Unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to initialize the user
  const initializeUser = async (user) => {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  // Context value to be provided to consumers
  const AuthInfo = {
    currentUser,
    userLoggedIn,
    loading,
    LoginWithGoogle,
    LogOut,
    setLoading,
    RegisterWithCoin,
    savedUser,
    setCoin,
    Coin,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
