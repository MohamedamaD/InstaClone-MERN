import { Loader } from "../../components";
import { PostForm } from "../../containers";
import { useCreatePost } from "../../hooks";

const CreatePost = () => {
  const { mutateAsync, isPending} = useCreatePost();
  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  if (isPending) return (
    <div className="d-flex vh-100 w-100 align-items-center justify-content-center">
      <Loader />
    </div>
  );
  return (
    <div id="create-post-page" className="w-100 p-4">
      <div className="container">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h6 className="m-0">create new post</h6>
        </div>

        <PostForm action={onSubmit} />
      </div>
    </div>
  );
};

export default CreatePost;
