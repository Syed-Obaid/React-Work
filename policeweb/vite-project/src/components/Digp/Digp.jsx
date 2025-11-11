import React from 'react';

function Digp() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-400 via-purple-300 to-pink-300 py-4 ">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex">
         
            <div className="w-1/3">
             <div className='flex flex-col items-center justify-center  mb-4'>
               <img 
                src="https://sindhpolice.gov.pk/storage/psp_imgs/QvhC2c6n41gyfaeBsJI2BGEifRIrE1mgUuSgJsFA.jpg" 
                alt="" 
                className="w-60 h-60 bg-white p-1 object-cover"
              />
            
              <div className="py-4 mt-2">
                <h2 className="text-sm font-semibold text-black text-start mb-4">
                  To the Police Officials...
                </h2>
              </div>
             </div>
              
            </div>

            <div className="w-2/3 p-6 relative">
     
              <div className="pb-2">
                <h1 className=" font-bold text-red-600">
                  Message Of DiGP Sjud Peer Muhammad Shah, PSP, QPM, & Bar, PPM, Tst
                </h1>
              </div>

           
              <div className="mb-2">
                <p className="text-xs font-bold text-black leading-relaxed">
                  To the General Public and Police Officials.
                </p>
                <p className="text-[11px] text-gray-700  leading-relaxed">
                  As the DiGP Traffic Karachi, I extend my warm regards to all citizens and dedicated police officials of our vibrant city. Our collective goal is to create a safer and more efficient traffic system that benefits everyone. Achieving this requires cooperation, adherence to traffic laws, and a shared commitment to improving our city's roads.
                </p>
              </div>

           
              <div className="">
                <h2 className="text-xs font-semibold text-black ">
                  To the General Public:
                </h2>
                <p className="text-[11px] text-gray-700  leading-relaxed">
                  Your role is crucial in making Karachi's roads safer. By following traffic rules, driving responsibly, and being considerate of other road users, you contribute significantly to reducing accidents and traffic congestion. Simple actions like obeying speed limits, using seat belts, and avoiding mobile phone use while driving can make a substantial difference. Remember, road safety is a shared responsibility, and your cooperation is essential for the well-being of our community.
                </p>
                
              </div>

              

             
              <div className="absolute bottom-0 right-6">
                <button className="text-[12px] px-3 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors duration-300">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Digp;