import React from 'react'

const contactPage = () => {
  return (
    <div>
       <div>
      {/* <div className="w-full flex justify-center items-center bg-gradient-to-b from-[#F5ECCD] to-[#D9D2A8] min-h-screen py-10"> */}
      <div className="w-full flex justify-center items-center bg-gradient-to-b  min-h-screen py-10">
        <form className="text-center py-8 px-6 max-w-[50rem] w-full bg-white rounded-xl shadow-lg">
          <h1 className="text-[#1E3A8A] text-5xl font-bold mb-4 tracking-wide">Contact Us Directly</h1>
          <div className="h-[3px] bg-gradient-to-r from-[#F97316] to-[#F59E0B] w-[60%] mx-auto mb-8 rounded-full"></div>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col w-[24rem]">
              <label className="text-gray-800 font-semibold mb-2 text-left">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="text-gray-700 border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1E3A8A] transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="flex flex-col w-[24rem]">
              <label className="text-gray-800 font-semibold mb-2 text-left">Full Name of Reported Person</label>
              <input
                type="text"
                placeholder="Full Name"
                className="text-gray-700 border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1E3A8A] transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="flex flex-col w-[24rem]">
              <label className="text-gray-800 font-semibold mb-2 text-left">Birth Date</label>
              <input
                type="date"
                className="text-gray-700 border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-[#1E3A8A] transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>
            <div className="flex flex-col w-[24rem]">
              <label className="text-gray-800 font-semibold mb-2 text-left">Gender</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="text-[#1E3A8A] focus:ring-[#1E3A8A] h-5 w-5"
                  />
                  <span className="text-gray-700 font-medium">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="text-[#1E3A8A] focus:ring-[#1E3A8A] h-5 w-5"
                  />
                  <span className="text-gray-700 font-medium">Female</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="text-[#1E3A8A] focus:ring-[#1E3A8A] h-5 w-5"
                  />
                  <span className="text-gray-700 font-medium">Other</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col w-[24rem]">
              <label className="text-gray-800 font-semibold mb-2 text-left">Questions or Comments</label>
              <textarea
                placeholder="Any Queries?"
                className="text-gray-700 border-2 border-gray-300 p-3 rounded-lg h-32 resize-none focus:outline-none focus:border-[#1E3A8A] transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>
            <button
              type="button"
              className="mt-6 bg-[#1E3A8A] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#1E4A9A] transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default contactPage
