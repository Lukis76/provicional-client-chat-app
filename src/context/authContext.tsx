import { AuthContextTypes } from "@context";
import { createContext } from "react";
/////////////////////////////////////////////////////////////////
export const authUserContext = createContext<AuthContextTypes>({
  user: null,
  login: () => {},
  logOut: () => {},
});
