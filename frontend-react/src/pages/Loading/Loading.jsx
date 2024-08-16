import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      id="loading"
      className="w-100 vh-100 d-flex align-items-center justify-content-center"
    >
      <BarLoader />
    </div>
  );
};

export default Loading;
