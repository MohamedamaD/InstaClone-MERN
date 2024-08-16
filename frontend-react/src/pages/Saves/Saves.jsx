import { useSelector } from "react-redux";
import SaveCard from "../../components/SaveCard/SaveCard";
import { useGetUserSaves } from "../../hooks/Query";
import Loading from "../Loading/Loading";

const Saves = () => {
  const { user } = useSelector((state) => state.user);
  const { data, isPending } = useGetUserSaves(user?.id);

  if (isPending) return <Loading />;
  return (
    <div className="w-100 p-4">
      <div className="container">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h6 className="m-0">Saves</h6>
        </div>

        <div className="row">
          {data?.map((save) => (
            <div
              key={save.id}
              className="col-12 col-md-6 col-xl-4 mb-2 position-relative px-1"
            >
              <SaveCard save={save} />
            </div>
          ))}
        </div>

        <div className="row">
          {data?.length === 0 && <p className="fs-2 text-center">no saves</p>}
        </div>
      </div>
    </div>
  );
};

export default Saves;
