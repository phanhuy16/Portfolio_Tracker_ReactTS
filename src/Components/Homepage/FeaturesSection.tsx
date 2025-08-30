import React from "react";
import { TrendingUp, BarChart2, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Advanced Trading Interface",
      desc: "Professional-grade trading tools with real-time market data and advanced charting.",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Portfolio Management",
      desc: "Track your investments and monitor your gains with our comprehensive dashboard.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security & Verification",
      desc: "Industry-leading security measures with KYC verification process to protect your assets.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Performance Analytics",
      desc: "Detailed analytics and credit scoring system to help you make informed decisions.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-black"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Advanced Trading
            <span className="text-green-400"> Features & Tools</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Experience professional-grade trading tools and features designed
            for both novice and experienced crypto traders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="text-green-400 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
