import { useCallback, useState } from "react";
import { SearchInputContainer } from "../../containers";
import { useDebounce, useUserSearch } from "../../hooks";
import { Avatar, FollowButton, Loader } from "../../components";
import { Link } from "react-router-dom";

const People = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = useCallback(
    (event) => setSearchTerm(event.target.value),
    []
  );

  const term = useDebounce(searchTerm, 500);
  const { data, isPending } = useUserSearch(term);

  return (
    <div className="w-100 p-4">
      <div className="container">
        <SearchInputContainer
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />

        {isPending ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              {data?.users?.map((user) => (
                <div
                  key={user.id}
                  className="col-12 d-flex align-items-center justify-content-between"
                >
                  <Link
                    to={`/profile/${user.id}`}
                    className="d-flex flex-fill align-items-center gap-2 p-2"
                  >
                    <div className="mb-2">
                      <Avatar
                        src={user.avatar}
                        width={70}
                        height={70}
                        alt="user avatar"
                      />
                    </div>
                    <div className="">
                      <p
                        className="text-body mb-2"
                        style={{ wordBreak: "break-word" }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-body-secondary mb-1"
                        style={{ wordBreak: "break-word" }}
                      >
                        {`@${user.username}`}
                      </p>
                    </div>
                  </Link>
                  <FollowButton to={user.id} />
                </div>
              ))}
            </div>
            {data?.users.length === 0 && <p className="fs-3">no result</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default People;
