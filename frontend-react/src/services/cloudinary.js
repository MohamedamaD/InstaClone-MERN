const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/auto/upload`;

export const UploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "whatsapp_clone");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const GetThumbnail = (src) => {
  src = src ?? "";
  const lastDotIndex = src.lastIndexOf(".");
  return src.substring(0, lastDotIndex) + ".jpg";
};
