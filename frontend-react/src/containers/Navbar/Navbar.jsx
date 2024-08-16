import { Brand, LogoutButton, ThemeSwitch } from "../../components";

const Navbar = () => {
  return (
    <section id="navbar" className="py-3 d-block d-md-none border-bottom">
      <div className="container d-flex align-items-center justify-content-between">
        <Brand />
        <div className="d-flex gap-3">
          <ThemeSwitch />
          <LogoutButton />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
