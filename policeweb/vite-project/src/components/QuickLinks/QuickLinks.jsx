import React from 'react';

const QuickLinks = () => {
  const quickLinks = [
    { 
      name: "Press Release", 
      imageClass: "bg-[url('/sheild_icon.png')] bg-contain bg-no-repeat bg-center",
    },
    { 
      name: "Tenders", 
      imageClass: "bg-[url('/sheild_icon.png')] bg-contain bg-no-repeat bg-center",
    },
    { 
      name: "Transfer Posting", 
      imageClass: "bg-[url('/sheild_icon.png')] bg-contain bg-no-repeat bg-center",
    },
    { 
      name: "Gallery", 
      imageClass: "bg-[url('/sheild_icon.png')] bg-contain bg-no-repeat bg-center",
    }
  ];

  return (
    <>
      <section style={{backgroundImage:"url('https://sindhpolice.gov.pk/front_end/images/background/background_image_2.jpg')"}} className="py-12 mx-auto bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            QUICK LINKS
          </h2>

          <div className=" max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <div
                key={link.name}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 p-6 text-center cursor-pointer group hover:bg-blue-600"
              >
                <div className={`w-30 h-30 flex justify-center items-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ${link.imageClass}`}>
                  <img className='w-14 h-14 ' src="https://sindhpolice.gov.pk/front_end/icons/orders_notification_icon.png" alt="" />
                </div>

                <h3 className="font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default QuickLinks;