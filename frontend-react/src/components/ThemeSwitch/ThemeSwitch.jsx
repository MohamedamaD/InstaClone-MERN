import { VscColorMode } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { ToggleTheme } from "../../store/slices/appSlice";

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ToggleTheme());
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center pointer"
      onClick={handleClick}
    >
      <VscColorMode size={25} />
    </div>
  );
};

export default ThemeSwitch;
