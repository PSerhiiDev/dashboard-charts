import Navbar from './components/Navbar';
import { AppRoutes } from './routes/AppRoutes';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="font-neo  bg-[#F4F4F4] flex flex-col relative" >
        <Navbar />
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
