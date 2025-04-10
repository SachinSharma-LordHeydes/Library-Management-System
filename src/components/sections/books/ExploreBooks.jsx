"use client";
import { BackgroundGradientDemo } from "@/components/ui/BackgroundGradientDemo";
import { useCallback, useEffect, useRef, useState } from "react";

const ExploreBooks = ({ api, limit, userID }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Function to fetch data
  const fetchData = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${api}?page=${page}&limit=${limit}&userID=${userID}`
        // `/api/books/detailOnScroll?page=${page}&limit=6`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const newBooks = await res.json();

      console.log("new books--->", newBooks);

      if (newBooks.data && newBooks.data.length > 0) {
        // Filter out duplicates
        const uniqueNewBooks = newBooks.data.filter(
          (newBook) => !books.some((book) => book._id === newBook._id)
        );

        if (uniqueNewBooks.length > 0) {
          setBooks((prevBooks) => [...prevBooks, ...uniqueNewBooks]);
        } else {
          setHasMore(false);
        }

        if (newBooks.data.length < 6) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Set up intersection observer for infinite scroll
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Manual load more function (as backup)
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  console.log("books----->", books);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <div className="p-4 flex flex-wrap justify-between gap-3 gap-y-12">
          {books.map((book, index) => {
            // Apply the ref to the last element for infinite scroll
            if (books.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={book._id || index}>
                  {Array.isArray(book.bookID) && book.bookID.length > 0 ? (
                    <BackgroundGradientDemo data={book?.bookID[0]} />
                  ) : (
                    <BackgroundGradientDemo data={book} />
                  )}
                </div>
              );
            } else {
              return Array.isArray(book.bookID) && book.bookID.length > 0 ? (
                <BackgroundGradientDemo key={index} data={book?.bookID[0]} />
              ) : (
                <BackgroundGradientDemo key={index} data={book} />
              );
            }
          })}
        </div>
      </div>

      {loading && (
        <div className="w-full text-center py-4">
          <p>Loading more books...</p>
        </div>
      )}

      {!loading && hasMore && books.length > 0 && (
        <div className="w-full text-center py-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && books.length > 0 && (
        <div className="w-full text-center py-4">
          <p>No more books to load</p>
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="w-full text-center py-4">
          <p>No books found</p>
        </div>
      )}
    </div>
  );
};

export default ExploreBooks;
