import React, { useState, useEffect } from "react";
import DashboardCliente from "./DashboardCliente";
import DashboardEmpresa from "./DashboardEmpresa";
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
   const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      const storedTipoUsuario = localStorage.getItem('tipoUsuario');
      console.log("store: ", storedTipoUsuario);

      if (storedTipoUsuario) {
         setTipoUsuario(storedTipoUsuario);
      } else {
         navigate('/home');
      }
   }, [navigate]);

   return (
      <div>
         {tipoUsuario === "cliente" && (
            <DashboardCliente />
         )}
         {tipoUsuario === "empresa" && (
            <DashboardEmpresa />
         )}
         {tipoUsuario && (
            (() => {
               localStorage.removeItem('tipoUsuario');
               return null;
            })()
         )}
      </div>
   );
};

export default Dashboard;
