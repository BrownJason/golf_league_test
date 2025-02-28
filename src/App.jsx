import Footer from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
import Scorecard from "./components/Scorecard";

function App() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url(./assets/golf-course-2.jpg)]">
      <header className="md:h-32 items-center bg-white rounded-b-lg shadow-sm dark:bg-[#6c844c] fixed inset-x-0 top-0 z-100">
        <div className="w-full h-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-[#f9e6bf]">
            © 2023{" "}
            <a href="/" className="hover:underline">
              This one
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-[#f9e6bf] sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Leaderboards
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div className="relative min-h-screen">
        <div className="relative z-10 mx-auto pt-32 w-full max-w-screen-lg">
          <Leaderboard />
        </div>
        <div className="relative z-10 mx-auto pb-16 w-full max-w-screen-lg">
          <Scorecard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
