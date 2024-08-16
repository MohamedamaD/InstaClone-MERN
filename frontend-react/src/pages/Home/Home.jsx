import { Loader, PostCard } from "../../components";
import { useGetFollowersPosts } from "../../hooks/Query";

const Home = () => {
  // const { isPending, data } = useGetPosts();
  const { data, isPending } = useGetFollowersPosts();
  return (
    <div id="home" className="p-4 w-100 d-flex justify-content-center">
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="posts">
          {isPending && <Loader />}

          {data?.posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {data?.posts?.length === 0 && (
            <p className="fs-5">No posts, explore to get more posts</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
