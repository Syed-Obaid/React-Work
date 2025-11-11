import React from 'react';

const LatestAnnouncement = () => {
  const announcements = [
    {
      id: 1,
      title: "Transfer and Posting Order of Section Officer",
      date: "2025-10-31 10:23:57",
      description: "Astrabad and TEX Traffic Section"
    },
    {
      id: 2,
      title: "New Traffic Regulations",
      date: "2025-10-28 11:44:50",
      description: "Updated traffic rules effective from next month"
    },
    {
      id: 3,
      title: "Recruitment Drive",
      date: "2025-10-27 10:34:11",
      description: "New positions open in traffic police department"
    }
  ];

  return (
    <>
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl  font-bold text-gray-800 mb-4">
              - Latest News & Events -
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 border-blue-600 p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1">
                    {announcement.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full ml-2">
                    NEW
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  {announcement.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{announcement.date}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              View All Announcements
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default LatestAnnouncement;