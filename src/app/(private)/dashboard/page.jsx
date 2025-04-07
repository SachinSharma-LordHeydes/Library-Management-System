import UserModel from "@/app/models/userModel";
import AdminDashboardPage from "@/components/pages/AdminDashboardPage";
import UserDashboardPage from "@/components/pages/UserDashboard";
import { auth } from "@clerk/nextjs/server";

const DashboardPage = async () => {
  const { userId } = await auth();

  const userData = await UserModel.findOne({ clerkId: userId });
  console.log("user Data-->", userData);

  return (
    <div>
      {userData?.role === "student" && <UserDashboardPage />}

      {userData?.role === "admin" && <AdminDashboardPage />}
    </div>
  );
};

export default DashboardPage;
