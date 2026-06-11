// src/Layout.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import PageTransition from "./components/PageTransition";
import Startpage from "./page/Startpage";
import Home from "./page/Home";
import Footer from "./components/footer/Footer";
import LoginPage from "./page/LoginPage";
import CreateAccount from "./page/CreateAccount";
import TheMuseum from "./page/TheMuseum";
import Visit from "./page/Visit";
import MuseumHalls from "./page/MuseumHalls";
import AlmisalatAlmuealaqa from "./page/AlmisalatAlmuealaqa";
import AldarajAleazim from "./page/AldarajAleazim";
import TutHall from "./page/TutHall";
import KingKhufu from "./page/KingKhufu";
import MainHalls from "./page/MainHalls";
import Staff from "./Admin/Staff";
import Attendance from "./Admin/Attendance";
import Tasks from "./Admin/Tasks";
import Artifacts from "./page/Artifacts";
import ArtifactDetails from "./page/ArtifactDetails";
import SearchPage from "./page/Search";
import Booking from "./page/Booking";
import Conser from "./page/Conser";
import Gardens from "./page/Gardens";
import SectionDetails from "./page/SectionDetails";
import MyTasks from "./page/staff/MyTasks";
import MyDashboard from "./page/staff/MyDashboard";
import ExhibitionDetails from "./page/ExhibitionDetails";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/loginPage" ||
    location.pathname === "/CreateAccount";
  const hideFooter =
    location.pathname === "/" ||
    location.pathname === "/loginPage" ||
    location.pathname === "/CreateAccount";

  return (
    <div className="flex flex-col min-h-screen">
      <PageTransition />
      {!hideNavbar && <Navbar />}

      <main className=" flex-1">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Startpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/Visit" element={<Visit />} />
          <Route path="/TheMuseum" element={<TheMuseum />} />
          <Route path="/MuseumHalls" element={<MuseumHalls />} />
          <Route
            path="/AlmisalatAlmuealaqa"
            element={<AlmisalatAlmuealaqa />}
          />
          <Route path="/AldarajAleazim" element={<AldarajAleazim />} />
          <Route path="/TutHall" element={<TutHall />} />
          <Route path="/KingKhufu" element={<KingKhufu />} />
          <Route path="/MainHalls" element={<MainHalls />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/Artifacts" element={<Artifacts />} />
          <Route path="/Artifact/:id" element={<ArtifactDetails />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Conser" element={<Conser />} />
          <Route path="/ExhibitionDetails" element={<ExhibitionDetails />} />
          <Route path="/exhibition/:id" element={<ExhibitionDetails />} />
          <Route path="/Gardens" element={<Gardens />} />
          <Route path="/MyDashboard" element={<MyDashboard />} />
          <Route path="/section/:sectionId" element={<SectionDetails />} />
          <Route path="/my-tasks" element={<MyTasks />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
export default Layout;
