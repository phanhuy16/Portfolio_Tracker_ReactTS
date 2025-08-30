import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "David Wilson",
      role: "Early Crypto Investor",
      content:
        "Customer support is exceptional, and the intuitive design made getting started with crypto trading seamless. A game-changer for both beginners and pros.",
      avatar: "https://picsum.photos/id/1005/80/80",
    },
    {
      name: "Emily Zhang",
      role: "DeFi Developer",
      content:
        "We've seen remarkable improvements in our trading efficiency since switching to CryptoTrade. The smart order routing and liquidity aggregation are particularly impressive.",
      avatar: "https://picsum.photos/id/1012/80/80",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-black"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Traders</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied traders on CryptoTrade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-gray-600"
                />
                <div>
                  <h4 className="font-semibold text-white text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
