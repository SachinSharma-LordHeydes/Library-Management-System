import React from 'react'

const aboutPage = () => {
  return (
    <div>
       <div className=" text-gray-900">
  
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold">
            Driving <span className="text-yellow-500">Innovation</span> in Online <span className="text-orange-500">Reading</span>
          </h1>
          <p className="mt-4 text-gray-700">
            We’re redefining how you experience books with a cutting-edge web app built for today’s readers. 
            From avid book lovers to curious newcomers, we bring stories and knowledge to life, right at your fingertips.
          </p>
        </div>
  
        {/* Image Placeholders */}
        <div className="flex justify-center space-x-6 my-8">
          <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
        </div>
  
        {/* Our Mission & What We Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-2 text-gray-700">
              We’re here to spark discovery and connect minds through a seamless online library experience. 
              Our web app empowers you to explore, borrow, and engage with books like never before.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">What We Offer</h2>
            <ul className="mt-2 text-gray-700 list-disc list-inside">
              <li>A dynamic digital collection across countless genres.</li>
              <li>Smart tools to find, reserve, and track your reads.</li>
              <li>A space to join a growing community of book enthusiasts.</li>
            </ul>
          </div>
        </div>
  
        {/* Stats */}
        <div className="flex justify-around bg-gray-200 p-4 rounded-lg my-8 text-center">
          <div>
            <p className="text-xl font-bold">1k+</p>
            <p>Books</p>
          </div>
          <div>
            <p className="text-xl font-bold">500+</p>
            <p>Active Readers</p>
          </div>
          <div>
            <p className="text-xl font-bold">10+</p>
            <p>Genres</p>
          </div>
        </div>
  
        {/* Why Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 mb-3">
          <div>
            <h2 className="text-2xl font-bold">Why Us?</h2>
            <p className="mt-2 text-gray-700">
              We’re pushing boundaries by blending technology with the timeless joy of reading, 
              delivering a library that’s always open and uniquely yours. [Library Name] isn’t just a service—it’s the future of reading, designed for you.
            </p>
          </div>
          <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
        </div>
  
        {/* Call to Action */}
        <div className="text-center mt-12 mb-3 ">
          <p className="text-lg text-gray-700">
            Ready to dive into the next chapter of reading? Join Our Library now and experience a library that moves with you.
          </p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
            <span>Explore Now</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default aboutPage
