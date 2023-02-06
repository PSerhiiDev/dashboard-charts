import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { AppRoutes } from './routes/AppRoutes';
import Footer from './components/Footer';

function App() {
  return (
  <>
   <div
        className="font-neo min-h-screen bg-[#F4F4F4] flex flex-col relative"
        //dir="rtl"
      >
        <Navbar />
        <AppRoutes />
      </div>
      <Footer />
  </>
  );
}

export default App;
