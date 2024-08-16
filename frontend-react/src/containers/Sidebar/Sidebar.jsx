import { NavLink, useLocation } from "react-router-dom";
import { Brand, LogoutButton, ThemeSwitch } from "../../components";
import { images, sidebarLinks } from "../../constants";
import "./Sidebar.css";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  return (
    <nav id="sidebar" className="d-none d-md-block border-end position-sticky">
      <div className="container h-100 py-3 d-flex flex-column gap-4">
        <Brand className="brand d-none d-lg-flex py-4" />

        <ul className="d-flex flex-column gap-3 p-0 flex-fill">
          {sidebarLinks.map((link, index) => (
            <li key={index} className="link-item">
              <NavLink
                to={link.to}
                className={`d-flex align-items-center justify-content-center justify-content-lg-start gap-2 route-link text-body rounded-2 p-3 ${
                  location.pathname === link.to ? "active" : ""
                }`}
              >
                <link.Icon size={25} />
                <h6 className="m-0 d-none d-lg-block">{link.text}</h6>
              </NavLink>
            </li>
          ))}

          <li className="link-item">
            <NavLink
              to={`profile/${user.id}`}
              className="route-link d-flex align-items-center gap-2 justify-content-center justify-content-lg-start text-body rounded-2 p-3"
            >
              <img
                src={user.avatar || images.PROFILE_DEFAULT}
                className="rounded-circle m-0 d-block object-fit-cover"
                width={30}
                height={30}
                alt="Avatar"
              />
              <h6 className="m-0 d-none d-lg-block">Profile</h6>
            </NavLink>
          </li>
        </ul>
        <div className="py-3 d-flex gap-3 align-items-center justify-content-between  justify-content-lg-between flex-column flex-lg-row">
          <LogoutButton>
            <h6 className="m-0 d-none d-lg-block">logout</h6>
          </LogoutButton>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
