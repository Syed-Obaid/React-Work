import React from 'react';

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-red-950 to-red-950 text-white py-12 border-t-4 border-red-600">
        <div className="container mx-auto px-4">
          
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
          
            <div className="text-center">
              <div className="flex flex-col items-center space-y-4">
               
                <div className="rounded-full p-3 shadow-lg">
                  <img 
                    src="https://sindhpolice.gov.pk/front_end/icons/sp_white_logo.png" 
                    alt="Sindh Police Logo" 
                    className="w-20 h-20"
                  />
                </div>
                
                
                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    SINDH POLICE
                  </h1>
                 <p className="text-lg md:text-xl text-red-300 font-semibold italic tracking-wider">
  —— PROUD TO SERVE ——
</p>
                </div>
              </div>
            </div>

          
            <div className="text-center flex justify-center flex-col items-center">
             
              <div className="flex justify-center items-center space-x-6 mb-6">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>

             
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center group cursor-pointer">
                  <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                    Sindh Police<br />Welfare
                  </p>
                </div>
                <div className="text-center group cursor-pointer">
                  <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                    Driving License<br />Branch
                  </p>
                </div>
                <div className="text-center group cursor-pointer">
                  <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                    Online Character<br />Certificate
                  </p>
                </div>
              </div>

              
              <div className="flex justify-center space-x-6 flex-wrap">
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-2 py-1">
                  Home
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-2 py-1">
                  About Us
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-2 py-1">
                  Gallery
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-2 py-1">
                  Contact Us
                </a>
              </div>
            </div>

           

<div className="text-left">
  <h3 className="text-lg font-semibold mb-4 text-red-300 border-b border-red-600 pb-1 w-28">
    Contact Info
  </h3>
  
  <div className="space-y-3 text-gray-300 text-sm">
    <div className="flex items-start space-x-2">
      <span className="text-red-400 mt-1">📍</span>
      <div>
        <p>DIGP Traffic Office, Aga Khan III</p>
        <p>Road, Karachi, Police Headquarter</p>
        <p>Garden, South Karachi</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
      <span className="text-red-400">📞</span>
      <p className="font-medium">0219-9216355</p>
    </div>
    
    <div className="flex items-center space-x-2">
      <span className="text-red-400">✉️</span>
      <p className="font-medium">trafficpolicekhi@gmail.com</p>
    </div>
  </div>
</div>
</div>



         
        </div>
      </footer>

          <div className="border-t border-gray-700"></div>

          <div className="text-center py-2 bg-blue-700 text-white flex justify-around items-center">
            <p className=" text-[11px]">
              © 2024 Sindh Police - All Rights Reserved.
            </p>
            <p className=" text-[11px]">
              Powered By: Software Section, IT Directorate Sindh, Sindh Police.
            </p>
          </div>

    </>
  );
}

export default Footer;