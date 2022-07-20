import { useContext } from "react";
import { AuthContext } from "../context/TokenAuthContext";

export const useAuth = () => useContext(AuthContext);
