import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeTheme } from "../store/slices/appSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const handleThemeChange = useCallback(
    () => document.body.setAttribute("data-bs-theme", theme),
    [theme]
  );

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    handleThemeChange();
  }, [handleThemeChange]);
};
