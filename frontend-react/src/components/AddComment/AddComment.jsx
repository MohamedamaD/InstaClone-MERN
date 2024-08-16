import { useAddCommentToPost } from "../../hooks";
import { Button, Form } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

const AddComment = ({ postId }) => {
  const { mutateAsync } = useAddCommentToPost(postId);
  const [content, setContent] = useState("");
  const handleChange = useCallback(
    (event) => setContent(event.target.value),
    []
  );

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    await mutateAsync(content);
    setContent("");
  };

  return (
    <Form
      className="d-flex align-items-center gap-2"
      onSubmit={handleSubmitComment}
    >
      <Form.Control
        value={content}
        onChange={handleChange}
        as="textarea"
        placeholder="Add a Comment..."
        style={{ resize: "none", maxHeight: 100, fieldSizing: "content" }}
      ></Form.Control>
      <Button variant="outline-primary" disabled={!content} type="submit">
        <IoIosSend />
      </Button>
    </Form>
  );
};

AddComment.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default AddComment;
