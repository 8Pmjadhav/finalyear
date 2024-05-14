import { useEffect } from "react";

export default function Following_Posts() {

  //useEffect(() => {},[]);
  return (
    <>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="px-4 py-2">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="https://pbs.twimg.com/profile_images/1121328878148817920/_Rn1PqUz_400x400.jpg"
              alt="Avatar"
            />
            <div>
              <div className="font-bold">John Doe</div>
              <div className="text-gray-600">@johndoe • 2h</div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-800">This is the content of the tweet. It can be a long text or short text, anything.</p>
          </div>
          <div className="mt-4">
            <img
              className="w-full rounded-lg"
              src="https://via.placeholder.com/800x400"
              alt="Tweet Image"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-6 0 3 3 0 016 0zM9 17V9"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 17V9"></path>
                <path d="M6 9v8m12-8v8"></path>
              </svg>
              <span>42</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"></path>
              </svg>
              <span>102</span>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}