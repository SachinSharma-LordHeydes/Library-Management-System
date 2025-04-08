import UserModel from "@/app/models/userModel";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import CreateProfileModal from "../ui/CreateProfileModal";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import PieChartComponent from "../ui/PieChart";

const items = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const UserDashboardPage = async () => {
  const { userId } = await auth();

  const userData = await UserModel.findOne({ clerkId: userId }).populate("profile");
  console.log("user Data-->", userData);
  return (
    <div className="text-xl  ">
      <div className="text-2xl md:text-4xl font-bold tracking-wider">
        DASHBOARD
      </div>
      <div className="lg:w-10/11 w-[100%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          {/* user detail */}
          <div className="">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center mt-16 gap-x-6 justify-baseline">
                <div>
                  <Image
                    src={userData?.imageURL}
                    alt="user image"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                </div>
                <div className="text-3xl tracking-wide ">
                  {userData?.userName}
                </div>
              </div>
              <div className="text-md flex items-center mt-2 w-fit mx-auto">
                {userData?.email}
              </div>

              <div className="mt-9">
                {!userData.profile && (
                  <CreateProfileModal userID={userData._id} />
                )}
                {userData.profile && (
                  <div>
                    <div className="bg-white shadow-2xl w-[500px] h-[250px] rounded-sm px-5 py-3">
                      <div className="flex justify-center mb-5 ">
                        <div>
                          <div className="flex justify-center gap-x-3">
                            <div>LoGO</div>
                            <div>BOOK HIVE</div>
                          </div>
                          <div className="text-sm">Smart Library System</div>
                        </div>
                      </div>
                      <div className="flex gap-x-2 items-center">
                        <div className="w-[25%] flex justify-center items-center">
                          <Image
                            src={userData?.imageURL}
                            alt="user image"
                            height={60}
                            width={60}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-lg tracking-wide w-[75%]">
                          <div className="w-[70%] ">
                            <div className="flex justify-between">
                              <div className="w-[50%]">Name</div>
                              <div className="w-[50%] text-start">{userData.userName}</div>
                            </div>

                            <div className="flex justify-between">
                              <div className="w-[50%]">Address</div>
                              <div className="w-[50%] text-start">{userData.profile.address}</div>
                            </div>

                            <div className="flex justify-between">
                              <div className="w-[50%]">Contact</div>
                              <div className="w-[50%] text-start">{userData.profile.phoneNumber}</div>
                            </div>

                            <div className="flex justify-between">
                              <div className="w-[50%]">Date of Issue</div>
                              <div className="w-[50%] text-start">{new Date(userData?.createdAt).toLocaleDateString()}</div>
                            </div>

                            <div className="flex justify-between">
                              <div className="w-[50%]">Valid Till</div>
                              <div className="w-[50%] text-start">{new Date(new Date(userData?.createdAt).setFullYear(new Date(userData?.createdAt).getFullYear() + 4)).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* user Stats  */}
          <div className="flex flex-col md:flex-row-reverse">
            <div className="">
              <PieChartComponent />
            </div>

            <div className=" flex flex-col md:flex-row gap-x-9 justify-center items-center">
              <div className="space-y-2 ">
                <div className="flex gap-x-3 ">
                  <div className="w-5 h-5 bg-red-500" />
                  <div>
                    <p className="text-sm">Overdue books</p>
                  </div>
                </div>

                <div className="flex gap-x-3 ">
                  <div className="w-5 h-5 bg-[#800080]" />
                  <div>
                    <p className="text-sm">Near-due books</p>
                  </div>
                </div>

                <div className="flex gap-x-3 ">
                  <div className="w-5 h-5 bg-[#00D500]" />
                  <div>
                    <p className="text-sm">Later due books</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 md:w-10/11 w-[100%] mx-auto">
        <div>
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-wider ">
              YOUR BOOKS
            </h2>
          </div>

          <div className="flex justify-center items-center mt-16">
            <InfiniteMovingCards items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
