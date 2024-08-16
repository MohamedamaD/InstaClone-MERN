import { Navigate, Outlet } from "react-router-dom";
import { images } from "../../constants/images";
import { useEffect, useState } from "react";
import { Brand } from "../../components";
import "./AuthLayout.css";
const AuthLayout = () => {
  const isAuth = false;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageArray = [
    images.SCREEN_1,
    images.SCREEN_2,
    images.SCREEN_3,
    images.SCREEN_4,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [imageArray.length]);

  return (
    <>
      {isAuth ? (
        <Navigate to={"/"} />
      ) : (
        <section className="h-100 w-100 d-flex">
          <div className="w-50 d-flex align-items-center justify-content-start flex-grow-1">
            <div className="container" id="outlet-container">
              <Brand />

              <Outlet />
            </div>
          </div>

          <div className="image-container w-50 d-none d-md-flex align-items-center">
            <div
              className=" position-relative  align-items-center justify-content-center"
              style={{
                background:
                  'url("/assets/auth_background.png")  10% 0% no-repeat',
                backgroundSize: "cover",
                width: "380px",
                height: "580px",
              }}
            >
              <img
                width={230}
                style={{ top: "23px", right: "12px" }}
                className="position-relative d-block ms-auto"
                src={imageArray[currentImageIndex]}
                alt="AUTH_BACKGROUND"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AuthLayout;
