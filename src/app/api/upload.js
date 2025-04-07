const NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
const uploadToCloudinary = async (file) => {
  if (!file) return { success: false };

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Hardcode for testing or use env var

  try {
    console.log("Uploading to Cloudinary with preset:", NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dzvq7ccgr/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Cloudinary response:", data);

    if (data.secure_url) {
      return { success: true, secure_url: data.secure_url };
    } else {
      console.error("Upload failed:", data.error?.message || "Unknown error");
      return { success: false, error: data.error?.message || "Unknown error" };
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: error.message };
  }
};
