import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen" style={{fontFamily:"system-ui"}}>
      <header style={{borderBottom:"1px solid #eee", padding:"12px 16px"}}>
        <strong>Giscademy</strong> · <a href="/cv">CV</a> · <a href="/courses">Kurs</a> · <a href="/consulting">Konsulent</a>
      </header>
      <main style={{padding:"16px"}}>
        <Outlet />
      </main>
      <footer style={{borderTop:"1px solid #eee", padding:"12px 16px", color:"#666"}}>
        © {new Date().getFullYear()} Giscademy
      </footer>
    </div>
  );
}
