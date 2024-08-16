import { Outlet } from "react-router-dom";
import { MobileNav, Navbar, Sidebar } from "../../containers";

const AppLayout = () => {
  return (
    <div
      id="app-layout"
      className="h-100 flex-column d-flex flex-md-row overflow-hidden"
    >
      <Navbar />
      <Sidebar />

      <section
        className="flex-fill flex-basis-0 flex d-md-flex h-100 overflow-auto"
      >
        <Outlet />
      </section>

      <MobileNav />
    </div>
  );
};

export default AppLayout;
