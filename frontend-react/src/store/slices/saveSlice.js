import { api } from "../../services";

export const getUserSaves = async (id) => {
  try {
    const response = await api.get(`api/v1/users/${id}/saves`);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An error occurred during get saves try again later"
    );
  }
};
