import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex mt-8 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-400 text-white">
      <h1 className="text-8xl font-extrabold mb-6 text-b">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-center mb-8 px-4 max-w-md">
        The page you are looking for doesn’t exist or has been moved. Don’t worry, you can always return to the homepage or continue managing your money like a pro!
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-blue-500 font-bold rounded-full shadow-md hover:bg-blue-100 transition"
      >
        Back to Home
      </Link>
      <div className="mt-12">
    
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-404-error_23-2147746234.jpg?ga=GA1.1.1232731637.1732516559&semt=ais_hybrid"
          alt="404 illustration"
          className="w-48 rounded-xl mb-4"
        />
      </div>
    </div>
  );
}
