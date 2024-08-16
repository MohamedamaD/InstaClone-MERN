import * as Yup from "yup";

export const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "name must be at least 3 characters")
    .max(50, "name must be less than 50 characters")
    .required("name is required"),
  username: Yup.string()
    .min(4, "username must be at least 3 characters")
    .max(50, "username must be less than 50 characters")
    .required("username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const PostSchema = Yup.object().shape({
  caption: Yup.string().required("Caption is required"),
  location: Yup.string().required("Location is required"),
  tags: Yup.array().of(Yup.string().required("Tag is required")),
  media: Yup.array(Yup.mixed().optional()).min(1, "at least drag one media"),
});

export const UpdatePostSchema = Yup.object().shape({
  caption: Yup.string().required("Caption is required"),
  location: Yup.string().required("Location is required"),
  tags: Yup.array().of(Yup.string().required("Tag is required")),
});

export const userSchema = Yup.object({
  name: Yup.string()
    .min(4, "name must be at least 3 characters")
    .max(50, "name must be less than 50 characters")
    .required("Name is required"),
  password: Yup.string().min(8, "password must be at least 8 characters"),
  bio: Yup.string(),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const otpSchema = Yup.object().shape({
  otpCode: Yup.string()
    .length(6, "otp must be 6 digits")
    .required("otp is required"),
});
