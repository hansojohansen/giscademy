import { Link, NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded hover:bg-gray-100 transition-colors";
const active =
  "text-blue-600 font-semibold";

export default function NavBar() {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Giscademy</Link>
        <nav className="flex gap-2">
          <NavLink to="/cv" className={({isActive}) => `${linkBase} ${isActive?active:""}`}>CV</NavLink>
          <NavLink to="/courses" className={({isActive}) => `${linkBase} ${isActive?active:""}`}>Kurs</NavLink>
          <NavLink to="/consulting" className={({isActive}) => `${linkBase} ${isActive?active:""}`}>Konsulent</NavLink>
        </nav>
      </div>
    </header>
  );
}
