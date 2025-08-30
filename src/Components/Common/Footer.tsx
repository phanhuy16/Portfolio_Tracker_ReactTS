const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to start trading?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of traders who have already discovered the power of
              our platform.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
              Create Account →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900/80 backdrop-blur-sm text-gray-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4 text-lg">CryptoTrade</h3>
            <p className="text-gray-400 mb-4">
              Empowering traders with advanced crypto trading solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Trading</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Markets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Fees
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Trading Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Market Analysis
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
