import { api, UploadFile } from "../../services";

export const createPost = async (payload) => {
  try {
    // media upload first
    const mediaPromises = payload.media.map((media) => UploadFile(media));
    const result = await Promise.all(mediaPromises);
    const media = result.map((media) => ({
      type: media.resource_type,
      src: media.url,
    }));

    payload.media = media;
    const response = await api.post(`api/v1/posts/`, payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Error creating post"
    );
  }
};
export const getPosts = async ({ page = 1, pageSize }) => {
  try {
    const response = await api.get(`api/v1/posts/`, {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
     throw (
       error?.response?.data?.message ||
       error?.response?.data?.error ||
       "Error getting posts"
     );
  }
};
export const getPost = async (id) => {
  try {
    const response = await api.get(`api/v1/posts/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Error getting post"
    );
  }
};
export const getFollowersPosts = async () => {
  try {
    const response = await api.get(`api/v1/posts/followers`);
    return response.data;
  } catch (error) {
   throw (
     error?.response?.data?.message ||
     error?.response?.data?.error ||
     "Error getting followers posts"
   );
  }
};
export const updatePost = async (id, payload) => {
  try {
    const fileResponse = await UploadFile(payload.image);
    delete payload.image;

    const response = await api.put(`api/v1/posts/${id}`, {
      ...payload,
      imageUrl: fileResponse.url,
    });
    return response.data;
  } catch (error) {
   throw (
     error?.response?.data?.message ||
     error?.response?.data?.error ||
     "Error update post"
   );
  }
};
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`api/v1/posts/${id}`);
    return response.data;
  } catch (error) {
  throw (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Error delete post"
  );
  }
};

export const searchPost = async (searchTerm) => {
  try {
    const response = await api.get(`api/v1/posts/search/`, {
      params: {
        searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Error searching"
    );
  }
};
export const likePost = async (postId) => {
  try {
    const response = await api.post(`api/v1/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Error like post"
    );
  }
};
export const unLikePost = async (postId) => {
  try {
    const response = await api.delete(`api/v1/posts/${postId}/like`);
    return response.data;
  } catch (error) {
  throw (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Error unlike post"
  );
  }
};
export const savePost = async (postId) => {
  try {
    const response = await api.post(`api/v1/posts/${postId}/save`);
    return response.data;
  } catch (error) {
  throw (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Error save post"
  );
  }
};
export const unSavePost = async (postId) => {
  try {
    const response = await api.delete(`api/v1/posts/${postId}/save`);
    return response.data;
  } catch (error) {
  throw (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Error unsave post"
  );
  }
};

export const addCommentToPost = async (payload) => {
  try {
    const response = await api.post(`api/v1/comments`, payload);
    return response.data;
  } catch (error) {
    throw (
      error.response.error.message ||
      error?.response?.data?.error ||
      "Error creating comment"
    );
  }
};
export const getPostComments = async (postId) => {
  try {
    const response = await api.get(`api/v1/comments`, {
      params: {
        postId,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response.error.message ||
      error?.response?.data?.error ||
      "Error creating comment"
    );
  }
};
