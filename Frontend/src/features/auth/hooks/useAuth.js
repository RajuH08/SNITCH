import { setUser } from "../state/auth.slice";
import { register, login } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  function storeAuthToken(token) {
    if (token) {
      localStorage.setItem("snitch_auth_token", token);
    }
  }

  async function handleRegister({
    email,
    contact,
    password,
    fullName,
    isSeller = false,
  }) {
    const data = await register({
      fullName,
      contact,
      email,
      password,
      isSeller,
    });

    dispatch(setUser(data.user));
    storeAuthToken(data.token);
  }

  async function handleLogin({ email, password }) {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
    storeAuthToken(data.token);
  }

  return { handleRegister, handleLogin };
};
