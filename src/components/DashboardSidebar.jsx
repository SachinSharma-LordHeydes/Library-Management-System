import Link from "next/link";
import { dashboardNavigation } from "../../public/dashboard/dashboardNavigation";

const DashboardSidebar = () => {
  return (
    <div className="px-2 py-1 ">
      <div className="border-1 border-white"></div>
      <div className="mt-5">
        {/* Title Section  */}
        <div>
          <div>LOGO</div>
          <div>BOOK HIBE</div>
        </div>

        {/* DashboardNavigation Section  */}

        <div className="mt-9">
          <div className="space-y-3 ">
            {dashboardNavigation.map((data, index) => (
              <div key={index} className=" ">
                <div className=" text-2xl cursor-pointer flex justify-center items-center">{data.Navigation}</div>
                <div className="border-1 border-dashed w-[65%] mx-auto my-2 mt-5 "/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
