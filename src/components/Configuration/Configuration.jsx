
import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import PaymentSection from './PaymentSection';
import PrivacySection from './PrivacySection';
import NotificationSection from './NotificationSection';
import CourseSection from './CourseSection';

export const Configuration = () => {
  const [selectedSection, setSelectedSection] = useState('perfil'); // Por defecto selecciona la sección de perfil

  // funcion para renderizar la sección seleccionada
  const renderSelectedSection = () => {
    switch (selectedSection) {
      case 'perfil':
        return <ProfileSection />;
      case 'pago':
        return <PaymentSection />;
      case 'privacidad':
        return <PrivacySection />;
      case 'notificaciones':
        return <NotificationSection />;
      case 'cursos':
        return <CourseSection />
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Configuración</h2>
          <a href="#" className={`flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full ${selectedSection === 'perfil' ? 'bg-indigo-100 focus:bg-indigo-100' : ''}`} onClick={() => setSelectedSection('perfil')}>
            Perfil
          </a>
          <a href="#" className={`flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 border rounded-full ${selectedSection === 'pago' ? 'bg-indigo-100 focus:bg-indigo-100' : ''}`} onClick={() => setSelectedSection('pago')}>
            Pago
          </a>
          <a href="#" className={`flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 border rounded-full ${selectedSection === 'privacidad' ? 'bg-indigo-100 focus:bg-indigo-100' : ''}`} onClick={() => setSelectedSection('privacidad')}>
            Privacidad
          </a>
          <a href="#" className={`flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 border rounded-full ${selectedSection === 'notificaciones' ? 'bg-indigo-100 focus:bg-indigo-100' : ''}`} onClick={() => setSelectedSection('notificaciones')}>
            Notificaciones
          </a>
          <a href="#" className={`flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 border rounded-full ${selectedSection === 'cursos' ? 'bg-indigo-100 focus:bg-indigo-100' : ''}`} onClick={() => setSelectedSection('cursos')}>
            Cursos
          </a>
        </div>
      </aside>
      <main className="w-full flex-1">
        <div className="p-2 md:p-4 h-full">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            {renderSelectedSection()}
          </div>
        </div>
      </main>
    </div>
  );
};
