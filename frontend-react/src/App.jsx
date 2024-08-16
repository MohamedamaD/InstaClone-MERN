import { Route, Routes } from "react-router-dom";
import { AppLayout, AuthLayout } from "./layouts";
import {
  Login,
  Register,
  Home,
  Explore,
  Saves,
  Users,
  CreatePost,
  EditPost,
  PostDetails,
  Profile,
  UpdateProfile,
  Loading,
  ForgotPassword,
  ResetPassword,
  EmailSignUp,
  People,
} from "./pages";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { ProtectedRoutes, UnProtectedRoutes } from "./utils";
import { useTheme, useAuth } from "./hooks";

function App() {
  const loading = useAuth();
  useTheme();
  if (loading) return <Loading />;
  return (
    <main className="app vh-100">
      <Toaster />
      <Routes>
        <Route element={<UnProtectedRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
          </Route>
          <Route path="email-sign-up" element={<EmailSignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saves />} />
            <Route path="/users" element={<Users />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/people" element={<People />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
