import { Award, Users, Heart, Truck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About E-Store</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're passionate about bringing you quality products that enhance your lifestyle. 
            From custom tumblers to elegant frames, every item is carefully curated for excellence.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                Founded in 2020, E-Store began as a small family business with a simple mission: 
                to provide high-quality, customizable products that help people express their unique style.
              </p>
              <p className="text-gray-300 mb-4">
                What started as a passion project has grown into a trusted online destination for 
                thousands of customers worldwide. We specialize in personalized items that make 
                perfect gifts or special treats for yourself.
              </p>
              <p className="text-gray-300">
                Every product we offer is selected with care, ensuring that our customers receive 
                only the best quality items that will last for years to come.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To provide exceptional products and personalized service that exceeds expectations, 
                while building lasting relationships with our customers through trust, quality, and innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Quality First</h3>
              <p className="text-gray-300">We never compromise on quality. Every product meets our high standards.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Customer Focus</h3>
              <p className="text-gray-300">Your satisfaction is our priority. We listen and adapt to your needs.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Personal Touch</h3>
              <p className="text-gray-300">We believe in the power of personalization to make products special.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Truck className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-300">Quick and reliable shipping to get your orders to you safely.</p>
            </div>

          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Sarah Johnson</h3>
              <p className="text-blue-400 mb-2">Founder & CEO</p>
              <p className="text-gray-300 text-sm">Passionate about creating unique products that bring joy to customers.</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Mike Chen</h3>
              <p className="text-green-400 mb-2">Head of Design</p>
              <p className="text-gray-300 text-sm">Creative visionary behind our product designs and customization options.</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Emily Rodriguez</h3>
              <p className="text-purple-400 mb-2">Customer Success</p>
              <p className="text-gray-300 text-sm">Dedicated to ensuring every customer has an amazing experience.</p>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-100">Products Sold</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-white mb-2">99.5%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}