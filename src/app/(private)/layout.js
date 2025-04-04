import DashboardSidebar from "@/components/DashboardSidebar";

export const metadata = {
  title: "Library App",
  description: "Start Reading Online",
};

export default function PrivateLayout({ children }) {
  return (
    <div className="mt-[50px] flex">
      <div className="w-[25%] bg-[#CFB68C] h-[100vh] ">
        <DashboardSidebar/>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
