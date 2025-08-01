import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  const clients = [
    { name: 'TechCorp', logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'EcoLife', logo: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'InnovateTech', logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'Global Finance', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'Taste Buds', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'ShopSmart', logo: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'HealthTech', logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
    { name: 'DesignStudio', logo: 'https://images.pexels.com/photos/7688337/pexels-photo-7688337.jpeg?auto=compress&cs=tinysrgb&w=200&h=100' },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#242424] mb-4">
            Trusted by Leading Brands
          </h3>
          <p className="text-gray-600">
            We've had the privilege of working with amazing clients across various industries.
          </p>
        </div>
      </div>

      <div className="relative">
        <motion.div
          className="flex space-x-12"
          animate={{
            x: [0, -50 * clients.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 w-48 h-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;