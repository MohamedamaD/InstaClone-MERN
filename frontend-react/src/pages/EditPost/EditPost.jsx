import { useParams } from "react-router-dom";
import { useDeletePost, useGetPost, useUpdatePost } from "../../hooks";
import Loading from "../Loading/Loading";
import { UpdatePostForm } from "../../containers";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending: postLoading } = useGetPost(id);
  const { mutateAsync: updatePost, isPending: updateLoading } =
    useUpdatePost(id);

  const onSubmit = async (data) => {
    await updatePost(data);
  };

  const { isPending: deleteLoading, mutateAsync: deletePost } =
    useDeletePost(id);

  const deleteAction = async () => {
    await deletePost();
  };

  if (postLoading || updateLoading || deleteLoading) return <Loading />;
  return (
    <div id="edit-post-page" className="w-100 p-4">
      <div className="container">
        <div className="d-flex align-items-center gap-2 mb-4">
          <h6 className="m-0">Edit Post</h6>
        </div>

        <UpdatePostForm
          post={post}
          deleteAction={deleteAction}
          action={onSubmit}
        />
      </div>
    </div>
  );
};

export default EditPost;
