import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  followUser,
  forgotPassword,
  getUserByID,
  isFollowingUser,
  login,
  logout,
  register,
  resetPassword,
  setIsLoggedIn,
  setUser,
  unfollowUser,
  updateUser,
  userSearch,
  verifyOTP,
} from "../store/slices/userSlice";
import {
  addCommentToPost,
  createPost,
  deletePost,
  getFollowersPosts,
  getPost,
  getPostComments,
  getPosts,
  likePost,
  savePost,
  searchPost,
  unLikePost,
  unSavePost,
  updatePost,
} from "../store/slices/postSlice";
import { queryKeys } from "../constants";
import { getUserSaves } from "../store/slices/saveSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// auth
export function useLogin() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (user) => login(user),
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.accessToken);
      toast.success(data.message);
      const userData = jwtDecode(data.accessToken);
      dispatch(setUser(userData));
      dispatch(setIsLoggedIn(true));
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
export function useRegister() {
  const go = useNavigate();
  return useMutation({
    mutationFn: (user) => register(user),
    onSuccess: (data, params) => {
      toast.success(data.message);
      go("/email-sign-up", { state: { email: params.email } });
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
export function useVerifyOTP() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload) => verifyOTP(payload),
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.accessToken);
      toast.success(data.message);
      const userData = jwtDecode(data.accessToken);
      dispatch(setUser(userData));
      dispatch(setIsLoggedIn(true));
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
export function useLogout() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (user) => logout(user),
    onSuccess: () => {
      sessionStorage.removeItem("accessToken");
      Cookies.remove("refreshToken");
      dispatch(setIsLoggedIn(false));
    },
  });
}
export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload) => forgotPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
}
export const useResetPassword = () => {
  const go = useNavigate();
  return useMutation({
    mutationFn: (payload) => resetPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message);
      go("/sign-in");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};

// post
export function useCreatePost() {
  const queryClient = useQueryClient();
  const go = useNavigate();

  return useMutation({
    mutationFn: (payload) => createPost(payload),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.RECENT_POSTS_KEY],
      });
      go("/");
    },
  });
}
export function useGetPosts() {
  return useQuery({
    queryFn: () => getPosts({}),
    queryKey: [queryKeys.RECENT_POSTS_KEY],
  });
}
export function useGetFollowersPosts() {
  return useQuery({
    queryFn: () => getFollowersPosts(),
    queryKey: [queryKeys.FOLLOWERS_POSTS_KEY],
  });
}
export function useGetPost(id) {
  return useQuery({
    queryFn: () => getPost(id),
    queryKey: [queryKeys.GET_POST_BY_ID, id],
    enabled: !!id,
  });
}
export function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryKey: [queryKeys.INFINITE_POSTS_KEY],
    queryFn: ({ pageParam = 1 }) => getPosts({ page: pageParam }),
    
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });
}
export function useSearchPost(searchTerm) {
  return useQuery({
    queryKey: [queryKeys.SEARCH_POST_KEY, searchTerm],
    queryFn: () => searchPost(searchTerm),
    enabled: !!searchTerm,
  });
}
export function useUpdatePost(id) {
  const queryClient = useQueryClient();
  const go = useNavigate();

  return useMutation({
    mutationFn: (payload) => updatePost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.RECENT_POSTS_KEY, id],
      });
      toast.success("post updated successfully");
      go("/");
    },
  });
}
export function useDeletePost(id) {
  const queryClient = useQueryClient();
  const go = useNavigate();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.RECENT_POSTS_KEY],
      });
      toast.success("post deleted successfully");
      go("/");
    },
  });
}
// like
export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => likePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FOLLOWERS_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.INFINITE_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_BY_ID],
      });
    },
  });
}
export function useUnLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => unLikePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FOLLOWERS_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.INFINITE_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_BY_ID],
      });
    },
  });
}
// saves
export function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => savePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FOLLOWERS_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.INFINITE_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_BY_ID],
      });
    },
  });
}
export function useUnSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => unSavePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.FOLLOWERS_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.INFINITE_POSTS_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_BY_ID],
      });
    },
  });
}
export function useGetUserSaves(id) {
  return useQuery({
    queryKey: [queryKeys.GET_USER_SAVES_KEY],
    queryFn: () => getUserSaves(id),
  });
}
// user
export function useGetUserByID(id) {
  return useQuery({
    queryKey: [queryKeys.GET_USER_BY_ID_KEY, id],
    queryFn: () => getUserByID(id),
  });
}
export function useUpdateUserByID() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload) => updateUser(payload),
    onSuccess: async (data) => {
      toast.success(data.message);
      dispatch(setUser(data.user));
    },
  });
}
export function useUserSearch(searchQuery) {
  return useQuery({
    queryFn: () => userSearch(searchQuery),
    queryKey: [queryKeys.SEARCH_USER_KEY, searchQuery],
  });
}

// following
export function useIsFollowingUser(userId) {
  return useQuery({
    queryKey: [queryKeys.IS_FOLLOWING_USER_KEY, userId],
    queryFn: () => isFollowingUser(userId),
  });
}
export function useFollowUser(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [queryKeys.FOLLOW_USER_KEY, userId],
    mutationFn: () => followUser(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.IS_FOLLOWING_USER_KEY, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER_BY_ID_KEY],
      });
    },
  });
}
export function useUnFollowUser(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.UnFOLLOW_USER_KEY, userId],
    mutationFn: () => unfollowUser(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.IS_FOLLOWING_USER_KEY, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER_BY_ID_KEY],
      });
    },
  });
}

// comments
export function useGetPostComments(postId) {
  return useQuery({
    queryKey: [queryKeys.POST_COMMENT_KEY, postId],
    queryFn: () => getPostComments(postId),
  });
}
export function useAddCommentToPost(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => addCommentToPost({ postId, content }),
    mutationKey: [queryKeys.ADD_COMMENT_KEY],

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST_COMMENT_KEY, postId],
      });
    },
  });
}
