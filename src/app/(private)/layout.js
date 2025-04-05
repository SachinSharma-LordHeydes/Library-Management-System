export const metadata = {
  title: "Library App",
  description: "Start Reading Online",
};

export default function PrivateLayout({ children }) {
  return (
    <div className="mt-[50px] flex gap-x-9">
      <div className="p-9 w-[95%] mx-auto">
        {children}
      </div>
    </div>
  );
}
