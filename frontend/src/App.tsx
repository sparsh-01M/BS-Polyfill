import React, { useState, useEffect } from "react";
import { Menu, X, Instagram } from "lucide-react";

// Define the type for image data from the backend
interface Image {
  _id: string;
  title: string;
  filePath: string;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([]);

  // Fetch images from the backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://bs-polyfill-web.onrender.com/api/images");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data: Image[] = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  // Helper function to get image by title
  const getImageByTitle = (title: string): string | undefined => {
    const image = images.find((img) => img.title === title);
    return image ? image.filePath : "https://via.placeholder.com/800"; // Fallback image
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-wider transform hover:scale-105 transition-transform duration-300">
                Mashal Pipes
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["HOME", "ABOUT", "WORK", "CONTACT"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                  >
                    <span>{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 transition-transform duration-300 hover:rotate-180"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["HOME", "ABOUT", "WORK", "CONTACT"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-900 block px-3 py-2 text-base font-medium hover:bg-gray-50 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen">
        <img
          src={getImageByTitle("Hero")} // Fetch Hero image dynamically
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center transform transition-all duration-700 hover:scale-105">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              PVC Pipes and Fittings
            </h2>
            <p className="text-xl text-white animate-slide-up">
              Innovation and Durability at one place
            </p>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      <section id="work" className="py-20 px-4 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center transform transition-all duration-500 hover:scale-105">
            Our Brands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            {images
              .filter((project) => ["FloWater", "Mashal"].includes(project.title))
              .map((project) => (
                <div
                  key={project._id}
                  className="group relative overflow-hidden transform transition-all duration-500 hover:scale-105 active:scale-95"
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg border-4 border-transparent group-hover:border-white transition-all duration-700">
                    <img
                      src={project.filePath}
                      alt={`${project.title} logo`}
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-lg md:text-xl font-medium mb-2">
                          {project.title}
                        </p>
                        <div className="w-12 h-0.5 bg-white mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="py-20 px-4 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center transform transition-all duration-500 hover:scale-105">
            SELECTED WORK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            {images
              .filter((project) =>
                ["PVC Pipes", "Fittings", "PVC Joints", "Others"].includes(project.title)
              )
              .map((project) => (
                <div
                  key={project._id}
                  className="group relative overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl"
                >
                  <div className="relative rounded-lg overflow-hidden shadow-lg border-4 border-transparent group-hover:border-white transition-all duration-700">
                    <img
                      src={project.filePath}
                      alt={project.title}
                      className="w-full h-[300px] md:h-[400px] object-cover rounded-lg transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex items-center justify-center">
                      <div className="text-center translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-white text-lg md:text-xl font-medium mb-2">
                          {project.title}
                        </p>
                        <div className="w-12 h-0.5 bg-white mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 transform transition-all duration-500 hover:translate-x-2">
 ABOUT OUR HIGH-QUALITY PVC PIPES AND FITTINGS
 </h2>
              <p className="text-gray-600 mb-4">
                Established in 2016, our PVC pipe factory has built a strong
                reputation for delivering high-quality, durable PVC pipes and fittings. Over
                the years, we have consistently provided reliable solutions to
                meet diverse industrial and domestic needs.
              </p>
              <p className="text-gray-600">
 With 8+ years of experience in the pipes and fittings industry, we combine
                expertise with continuous innovation to manufacture PVC pipes
                that exceed industry standards.
              </p>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105">
              <img
                src={getImageByTitle("About Us")} // Fetch About Us image dynamically
                alt="About Us"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Areas We Serve Section */}
<section id="areas-served" className="py-20 bg-white px-4">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 transform transition-all duration-500 hover:scale-105">AREAS WE SERVE WITH OUR PVC PIPES</h2>
      <p className="text-gray-600">
 We take pride in delivering high-quality PVC pipes and fittings to various regions across India, ensuring durability and excellence in every product.
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { name: "Chennai", image: getImageByTitle("Chennai") },
        { name: "Agra", image: getImageByTitle("Agra") },
        { name: "Delhi", image: getImageByTitle("Delhi") },
        { name: "Mumbai", image: getImageByTitle("Mumbai") },
      ].map((area, index) => (
        <div
          key={index}
          className="transform transition-all duration-500 hover:scale-105"
        >
          <img
            src={area.image}
 alt={`Map showing the area of ${area.name}`}
            className="w-full h-40 object-cover rounded-2xl mb-4 shadow-lg"
          />
          <h3 className="text-xl font-semibold">{area.name}</h3>
        </div>
      ))}
    </div>
  </div>
</section>



{/* Why Us Section */}
<section id="why-us" className="py-20 bg-gray-50 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 transform transition-all duration-500 hover:scale-105">WHY CHOOSE OUR PVC PIPES AND FITTINGS</h2>
      <p className="text-gray-600">
        Discover why our PVC pipes and fittings are the preferred choice for numerous customers across India.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: "Best Quality Pipes and Fittings", description: "We ensure top-notch quality PVC pipes and fittings with rigorous quality checks at every stage." },
        { title: "Best Market Rate", description: "Our pricing strategy guarantees the best rates without compromising on quality." },
        { title: "Better Customer Support", description: "Our dedicated support team is always ready to assist you." },
        { title: "Eco-Friendly Products", description: "We use sustainable materials and environmentally conscious processes." },
        { title: "Timely Delivery of Pipes and Fittings", description: "Our efficient supply chain ensures that your orders of pipes and fittings arrive on time, every time." }
      ].map((reason, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-500 hover:scale-105"
        >
          <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
          <p className="text-gray-600">{reason.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 transform transition-all duration-500 hover:scale-105">
            GET IN TOUCH
          </h2>
          <div className="flex justify-center space-x-8 mb-8">
            <a
              href="https://instagram.com"
              className="text-gray-900 hover:text-gray-600 transform transition-all duration-300 hover:scale-125"
            >
              <Instagram size={24} />
            </a>
          </div>
          <div className="space-y-2 transform transition-all duration-500 hover:translate-y-1">
            <p className="text-gray-700">Email: contact.flowater@gmail.com</p>
            <p className="text-gray-700">Phone: +91 9897201580</p>
            <p className="text-gray-700">Address: Sikandra, Agra,</p>
            <p className="text-gray-700"> Uttar Pradesh, 282010</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2016 BS Polyfill. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
