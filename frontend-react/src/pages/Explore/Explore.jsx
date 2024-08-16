import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce, useGetInfinitePosts, useSearchPost } from "../../hooks";
import { useInView } from "react-intersection-observer";
import { Loader } from "../../components";
import { SearchInputContainer, PostList } from "../../containers";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState("");
  const term = useDebounce(searchTerm, 500);
  const { data: SearchResult, isFetching: searchIsLoading } =
    useSearchPost(term);
  const handleSearchChange = useCallback(
    (event) => setSearchTerm(event.target.value),
    []
  );

  const {
    data: InfinitePosts,
    isPending: postsIsLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetInfinitePosts();

  const posts = useMemo(
    () =>
      InfinitePosts?.pages.reduce(
        (accumulator, page) => [...accumulator, ...page.posts],
        []
      ),

    [InfinitePosts?.pages]
  );
  useEffect(() => {
    if (inView && !searchTerm) fetchNextPage();
  }, [inView, searchTerm, fetchNextPage]);
  return (
    <div className="w-100 p-4">
      <div className="container">
        <SearchInputContainer
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />

        <div className="mb-3">
          <h5 className="">popular today</h5>
        </div>
        {searchIsLoading || postsIsLoading ? (
          <Loader />
        ) : (
          <PostList
            displayStatus={true}
            displayUser={true}
            posts={SearchResult?.length > 0 ? SearchResult : posts}
          />
        )}

        {!searchTerm && hasNextPage && (
          <div className="mt-3" ref={ref}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
