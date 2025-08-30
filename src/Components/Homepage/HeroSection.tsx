import React from "react";
import { useAuth } from "../../Context/useAuth";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="mb-12">
        <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300 mb-8 border border-gray-700/50">
          <span className="mr-2">🔮</span>
          Next-gen crypto trading platform
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Trade crypto with confidence & security
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
          Experience seamless cryptocurrency trading with advanced features,
          real-time analytics, and institutional-grade security. Start trading
          in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              isLoggedIn() ? navigate("/portfolio") : navigate("/login");
            }}
            className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
          >
            Start Trading Now
          </button>
          <button
            onClick={() => {
              isLoggedIn() ? navigate("/portfolio") : navigate("/login");
            }}
            className="border border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
          >
            View Markets →
          </button>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="mt-20 relative overflow-hidden rounded-2xl shadow-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
        <div className="relative p-8">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
            <div className="flex space-x-8">
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Dashboard
              </span>
              <span className="text-green-400 font-medium relative">
                Reports
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400 rounded-full"></div>
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Cryptocurrency
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Exchange
              </span>
              <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Community
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://picsum.photos/id/1005/40/40"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-gray-600"
              />
              <div className="text-sm text-gray-300">
                <div className="font-medium">Ilona Smilduet</div>
                <div className="text-gray-500 text-xs">iloncut46@gmail.com</div>
              </div>
            </div>
          </div>

          <div className="text-white text-2xl mb-8 font-semibold">
            Welcome back, Ilona
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm font-medium mb-2">
                SPENT THIS MONTH
              </p>
              <p className="text-3xl font-bold text-white mb-1">$5,950.64</p>
              <p className="text-green-400 text-sm font-medium">+2.34%</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm font-medium mb-4">
                ACTIVE CREDIT
              </p>
              <div className="h-32 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                <div className="w-20 h-20 text-green-400">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M20,70 L30,30 L40,60 L50,20 L60,50 L70,25 L80,55"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm font-medium mb-2">
                YOUR CREDIT SCORE
              </p>
              <p className="text-4xl font-bold text-white mb-1">660</p>
              <p className="text-gray-400 text-sm mb-4">Average</p>
              <div className="w-16 h-16 rounded-full relative">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="113"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
