/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import Router from "next/router";
import Sidebar from "./components/sidebar";
import { useAuth } from "../controllers/hooks/use_auth";
import { useState } from "react";
import GeneralReportModal from "./components/modals/generalReport";

export default function Home() {
  const { auth } = useAuth();
  const [modalVisibleGR, setModalVisibleGR] = useState<boolean>(false);

  const handlePagos = () => {
    Router.push("/solicitude");
  };

  const handleCitas = () => {
    Router.push("/medical-appointment");
  };

  const handleClientes = () => {
    Router.push("/clients");
  };

  const handleMascotas = () => {
    Router.push("/mascotas");
  };

  return (
    <>
      <title>Inicio | Oh My Dog</title>
      <div className="flex h-screen">
        <div className="flex-1 bg-blue-50 p-6">
          <div className="bg-white w-full rounded-xl shadow-2xl p-8 mb-8">
            <div className="flex items-center mb-8">
              <p className="text-3xl text-center text-blue-800 font-bold w-full">
                <strong>Sistema de Gestión Veterinaria</strong> |{" "}
                <em className="text-blue-600">"Oh My Dog"</em>
              </p>
              <hr className="mt-4 mb-6 border-t-2 border-blue-300" />
            </div>

            {/* Modulos de Gestión */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Citas */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Gestión de Citas
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCitas}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver Citas Programadas
                  </button>
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Historial de Citas
                  </button>
                </div>
              </div>

              {/* Pagos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Pagos
                </h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handlePagos}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Ver Pagos Realizados
                  </button>
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Ver Reportes de Pagos
                  </button>
                </div>
              </div>

              {/* Ventas */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Ventas
                </h2>
                <div className="flex flex-col gap-3">
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Ver Ventas Realizadas
                  </button>
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Reportes de Ventas
                  </button>
                </div>
              </div>

              {/* Especialidades */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Especialidades
                </h2>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full">
                  Ver Especialidades
                </button>
              </div>

              {/* Médicos */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Médicos
                </h2>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full">
                  Ver Médicos
                </button>
              </div>

              {/* Clientes */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Clientes
                </h2>
                <button onClick={handleClientes} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full">
                  Ver Clientes
                </button>
              </div>

              {/* Mascotas */}
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h2 className="text-center text-xl font-semibold text-blue-600 mb-4">
                  Mascotas
                </h2>
                <button onClick={handleMascotas} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full">
                  Ver Mascotas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GeneralReportModal
        visible={modalVisibleGR}
        close={() => {
          setModalVisibleGR(null);
        }}
      />
    </>
  );
}