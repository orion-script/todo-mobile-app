// // AuthContext.tsx
// import React, { createContext, useState, ReactNode, useEffect } from "react";
// import { Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Define the shape of your context data
// interface AuthContextData {
//   userToken: string | null;
//   isLoading: boolean;
//   userProfile: UserProfile | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// interface UserProfile {
//   name: string;
//   email: string;
// }

// const AuthContext = createContext<AuthContextData | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const baseUrl = "https://todo-33hzc3d83-orionscripts-projects.vercel.app/";

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [userToken, setUserToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

//   // Load token from AsyncStorage on app load
//   useEffect(() => {
//     const loadToken = async () => {
//       const token = await AsyncStorage.getItem("userToken");
//       if (token) {
//         setUserToken(token);
//         fetchUserProfile(token);
//       }
//       setIsLoading(false);
//     };
//     loadToken();
//   }, []);

//   // Fetch user profile
//   const fetchUserProfile = async (token: string) => {
//     try {
//       const response = await fetch(`${baseUrl}users/profile`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUserProfile(data);
//       } else {
//         Alert.alert("Failed to fetch profile", data.message);
//       }
//     } catch (error: any) {
//       Alert.alert("Error fetching user profile", error);
//     }
//   };

//   // Implement login function
//   const login = async (email: string, password: string) => {
//     try {
//       setIsLoading(true);

//       const response = await fetch(`${baseUrl}auth/login`, {
//         method: "POST", // Change to POST
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }), // Send credentials in the body
//       });

//       const data = await response.json();

//       if (response.ok && data.token) {
//         await AsyncStorage.setItem("userToken", data.token);
//         setUserToken(data.token);
//         fetchUserProfile(data.token);
//       } else {
//         Alert.alert("Login failed", data.message);
//       }
//     } catch (error: any) {
//       Alert.alert("Login error", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Implement register function
//   const register = async (name: string, email: string, password: string) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${baseUrl}auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();
//       if (response.ok && data.token) {
//         await AsyncStorage.setItem("userToken", data.token);
//         setUserToken(data.token);
//         fetchUserProfile(data.token);
//       }
//     } catch (error: any) {
//       Alert.alert("Registration error", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Implement logout function
//   const logout = async () => {
//     setIsLoading(true);
//     await AsyncStorage.removeItem("userToken");
//     setUserToken(null);
//     setUserProfile(null);
//     setIsLoading(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ userToken, isLoading, userProfile, login, register, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = React.useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigate } from "react-router-native";

// Define the shape of your context data
interface AuthContextData {
  userToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserProfile {
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const baseUrl = "https://todo-33hzc3d83-orionscripts-projects.vercel.app/";

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Compute isAuthenticated based on userToken
  const isAuthenticated = !!userToken;

  // Load token from AsyncStorage on app load
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setUserToken(token);
        fetchUserProfile(token);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  // Fetch user profile
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${baseUrl}users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
      } else {
        Alert.alert("Failed to fetch profile", data.message);
        logout();
      }
    } catch (error: any) {
      Alert.alert("Error fetching user profile", error);
    }
  };

  // Implement login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${baseUrl}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        fetchUserProfile(data.token);
      } else {
        Alert.alert("Login failed", data.message);
      }
    } catch (error: any) {
      Alert.alert("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Implement register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        fetchUserProfile(data.token);
      }
    } catch (error: any) {
      Alert.alert("Registration error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Implement logout function
  const logout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
    setUserProfile(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isAuthenticated, // Add this to the context value
        isLoading,
        userProfile,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
