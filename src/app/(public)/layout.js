export const metadata = {
    title: "Library App",
    description: "Start Reading Online",
  };
  
  export default function PrivateLayout({ children }) {
    return (
          <div className="md:w-[80%] flex justify-center items-center sm:px-5 max-sm:px-5 mx-auto">{children}</div>
    );
  }
  