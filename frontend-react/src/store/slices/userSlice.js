import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { UploadFile } from "../../services";

export const login = async (payload) => {
  try {
    const response = await api.post("api/v1/users/login", payload);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "An error occurred during logging";
  }
};
export const register = async (payload) => {
  try {
    const response = await api.post("api/v1/users/register", payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message || "An error occurred during registration"
    );
  }
};
export const logout = async () => {
  try {
    const response = await api.post("api/v1/users/logout");
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message || "An error occurred during logging out"
    );
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await api.post(`api/v1/users/forgot-password`, payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during sending the email try again later"
    );
  }
};
export const resetPassword = async (payload) => {
  try {
    const response = await api.post(`api/v1/users/reset-password`, payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during resetting try again later"
    );
  }
};
export const verifyOTP = async (payload) => {
  try {
    const response = await api.post(`api/v1/users/verify-otp`, payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during verifying try again later"
    );
  }
};
export const getUserByID = async (id) => {
  try {
    const response = await api.get(`api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during getting user try again later"
    );
  }
};
export const updateUser = async (payload) => {
  try {
    if (payload.file) {
      const fileResponse = await UploadFile(payload.file);
      payload.avatar = fileResponse.url;
    }

    if (payload.password === "") {
      delete payload.password;
    }

    delete payload.file;
    const response = await api.put(`api/v1/users/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during update data try again later"
    );
  }
};
export const userSearch = async (searchQuery) => {
  try {
    const response = await api.get(`api/v1/users/user/search`, {
      params: {
        searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during searching try again later"
    );
  }
};
export const followUser = async (userIdToFollow) => {
  try {
    const response = await api.post(`api/v1/users/${userIdToFollow}/follow`);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during following try again later"
    );
  }
};

export const unfollowUser = async (userIdToUnfollow) => {
  try {
    const response = await api.delete(
      `api/v1/users/${userIdToUnfollow}/unfollow`
    );
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during following try again later"
    );
  }
};

export const isFollowingUser = async (userId) => {
  try {
    const response = await api.get(`api/v1/users/${userId}/is-following`);
    return response.data.isFollowing;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during following try again later"
    );
  }
};

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    avatar: "",
  },
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser } = userSlice.actions;

export default userSlice.reducer;
