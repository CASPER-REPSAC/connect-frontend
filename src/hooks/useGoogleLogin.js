import { useDispatch } from "react-redux";
import { login, setGoogleToken, loginStart, loginFail } from "@/redux/auth";

export const useGoogleLogin = () => {
  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    dispatch(loginStart());
    dispatch(setGoogleToken(response.accessToken));
    dispatch(login());
  };

  const onFailure = (error) => {
    dispatch(loginFail(error));
  };

  return {
    onSuccess,
    onFailure,
  };
};
