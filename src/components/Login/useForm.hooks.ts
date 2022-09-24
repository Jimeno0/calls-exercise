import { useState } from "react";
import { useAuth } from "hooks";

export const useForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isUserLoggedIn } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin({ username, password });
  };

  const handleUsername = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUsername(value);
  };

  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPassword(value);
  };

  return {
    handleSubmit,
    handlePassword,
    handleUsername,
    isUserLoggedIn,
    username,
    password,
  };
};
