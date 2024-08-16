import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "../store/slices/userSlice";
export const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("refreshToken");

  const handleRefresh = useCallback(async () => {
    if (token) {
      try {
        setLoading(true);
        const response = await api.post("api/v1/users/refresh-token");
        sessionStorage.setItem("accessToken", response.data.accessToken);
        const userData = jwtDecode(response.data.accessToken);
        dispatch(setUser(userData));
        dispatch(setIsLoggedIn(true));
      } catch (error) {
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        sessionStorage.clear("accessToken");
        Cookies.remove("refreshToken");
      } finally {
        setLoading(false);
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return loading;
};
