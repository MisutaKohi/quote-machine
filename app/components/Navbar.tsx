import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Quote Machine</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Home
          </Link>
          <Link href="/upload" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Upload
          </Link>
          <Link href="/viewall" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            View All
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;