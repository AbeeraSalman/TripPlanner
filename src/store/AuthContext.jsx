import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const SESSION_KEY = "tripplanner_session";
const USERS_KEY = "tripplanner_users";

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) dispatch({ type: "LOGIN", payload: JSON.parse(saved) });
    setIsReady(true);
  }, []);

  const signUp = ({ name, email, password }) => {
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = { id: crypto.randomUUID(), name, email, password };
    saveUsers([...users, newUser]);

    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    dispatch({ type: "LOGIN", payload: session });
  };

  const signIn = ({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password.");

    const session = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    dispatch({ type: "LOGIN", payload: session });
  };

  const logOut = () => {
    localStorage.removeItem(SESSION_KEY);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, isReady, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}