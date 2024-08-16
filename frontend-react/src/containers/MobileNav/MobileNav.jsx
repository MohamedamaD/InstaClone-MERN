import { NavLink, useLocation } from "react-router-dom";
import { images, sidebarLinks } from "../../constants";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="mobile-nav bg-body d-flex gap-1 d-md-none align-items-center justify-content-center py-1 border-top">
      {sidebarLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={`d-flex flex-column align-items-center route-link gap-2 text-body rounded-2 p-3 ${
            location.pathname === link.to ? "active" : ""
          }`}
        >
          <link.Icon size={20} />
        </NavLink>
      ))}

      <NavLink to={`/profile/${user?.id}`}>
        <img
          src={user.avatar || images.PROFILE_DEFAULT}
          className="rounded-circle object-fit-cover"
          width={30}
          height={30}
          alt="Avatar"
        />
      </NavLink>
    </nav>
  );
};

export default MobileNav;
