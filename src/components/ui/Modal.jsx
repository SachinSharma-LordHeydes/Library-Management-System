"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const addBookFields = [
  { nameToShow: "Book Name", nameToSend: "bookTitle" },
  { nameToShow: "Book Category", nameToSend: "bookCatagory" },
  { nameToShow: "Author", nameToSend: "bookAuthor" },
  { nameToShow: "Image", nameToSend: "bookImageURL", isFile: true },
  { nameToShow: "Author Image", nameToSend: "authorImageURL", isFile: true },
  { nameToShow: "About Book", nameToSend: "bookDescription" },
  { nameToShow: "Books Quantity", nameToSend: "booksQuantity" },
];

const Modal = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    bookCatagory: "",
    bookAuthor: "",
    bookImageURL: null,
    authorImageURL: null,
    bookDescription: "",
    booksQuantity: "",
  });

  const [previews, setPreviews] = useState({
    bookImageURL: null,
    authorImageURL: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [fieldName]: file });
      setPreviews({ ...previews, [fieldName]: URL.createObjectURL(file) });
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, [fieldName]: file });
      setPreviews({ ...previews, [fieldName]: URL.createObjectURL(file) });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resetForm = () => {
    Object.values(previews).forEach((preview) => {
      if (preview) URL.revokeObjectURL(preview);
    });
    setFormData({
      bookTitle: "",
      bookCatagory: "",
      bookAuthor: "",
      bookImageURL: null,
      authorImageURL: null,
      bookDescription: "",
      booksQuantity: "",
    });
    setPreviews({ bookImageURL: null, authorImageURL: null });
    setError(null);
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return { success: false, error: "No file provided" };

    // Constants - replace with your actual values
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      console.log(
        `Uploading to Cloudinary (${CLOUD_NAME}) with preset: ${UPLOAD_PRESET}`
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudinary API error:", response.status, errorText);
        return {
          success: false,
          error: `Upload failed: ${response.status} ${errorText}`,
        };
      }

      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (data.secure_url) {
        return { success: true, secure_url: data.secure_url };
      } else {
        console.error("No secure_url in response:", data);
        return {
          success: false,
          error: data.error?.message || "Missing image URL in response",
        };
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      // Check if files exist
      if (!formData.bookImageURL || !formData.authorImageURL) {
        throw new Error("Both book and author images are required");
      }

      console.log("Uploading book image...");
      const bookImageResponse = await uploadToCloudinary(formData.bookImageURL);

      if (!bookImageResponse.success) {
        throw new Error(`Book image upload failed: ${bookImageResponse.error}`);
      }

      console.log("Uploading author image...");
      const authorImageResponse = await uploadToCloudinary(
        formData.authorImageURL
      );

      if (!authorImageResponse.success) {
        throw new Error(
          `Author image upload failed: ${authorImageResponse.error}`
        );
      }

      // Prepare data for API
      const bookData = {
        ...formData,
        bookImageURL: bookImageResponse.secure_url,
        authorImageURL: authorImageResponse.secure_url,
      };

      console.log("Sending data to API:", bookData);

      // Send to your API
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const result = await response.json();

      if (result.success) {
        console.log("Book added successfully!");
        resetForm();
      } else {
        throw new Error(result.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "An error occurred while adding the book");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black text-white  rounded-md">
          Add Books
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">ADD BOOK</DialogTitle>
            <DialogDescription>
              Please fill the input field below to add a new book to your
              library
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="md:w-[90%] mx-auto">
            {addBookFields.map((field, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:justify-between md:items-center my-4"
              >
                <label
                  htmlFor={field.nameToSend}
                  className="font-medium text-lg mb-1 md:mb-0"
                >
                  {field.nameToShow}
                </label>
                {field.isFile ? (
                  <div
                    className="w-full md:w-1/2 border-2 border-dashed border-gray-400 p-2 rounded-md text-center"
                    onDrop={(e) => handleDrop(e, field.nameToSend)}
                    onDragOver={handleDragOver}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      name={field.nameToSend}
                      onChange={(e) => handleFileChange(e, field.nameToSend)}
                      className="hidden"
                      id={field.nameToSend}
                    />
                    <label
                      htmlFor={field.nameToSend}
                      className="cursor-pointer"
                    >
                      {previews[field.nameToSend] ? (
                        <img
                          src={previews[field.nameToSend]}
                          alt={`${field.nameToShow} preview`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      ) : (
                        <span>Drag & drop or click to upload an image</span>
                      )}
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    name={field.nameToSend}
                    value={formData[field.nameToSend]}
                    onChange={handleChange}
                    className="w-full md:w-1/2 bg-gray-100 border border-gray-300 mt-1 rounded-sm px-2 py-1 text-md md:text-lg"
                    required
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end mt-5 px-4">
              <button
                type="submit"
                className="bg-black text-white text-xl py-2 px-5 rounded-md w-fit disabled:opacity-50"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Add Book"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
