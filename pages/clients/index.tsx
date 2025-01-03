/* eslint-disable react/no-unescaped-entities */
import { Button } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import { CheckPermissions } from "../../controllers/utils/check_permissions";
import Router from "next/router";
import { toast } from "react-toastify";
import LoadingContainer from "../components/loading_container";
import { useAuth } from "../../controllers/hooks/use_auth";
import { useEffect, useState } from "react";
import HttpClient from "../../controllers/utils/http_client";
import { Pendiente } from "../../controllers/utils/constants";
import { Cliente, Pago } from "../../models";
import TreeTable, { ColumnData } from "../components/tree_table";

type Props = {
  dates: Array<string>;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  inTabs?: boolean;
};

export const ClientPage = (props: Props) => {
  const { auth } = useAuth();
  const [tableData, setTableData] = useState<Array<Cliente>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);

    var response = await HttpClient(
      "/api/client",
      "GET",
      auth.usuario,
      auth.rol
    );

    const solicitudes: Array<Cliente> = response.data ?? [];
    console.log();
    setTableData(solicitudes);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnData[] = [
    {
      dataField: "number",
      caption: "#",
      alignment: "center",
      cssClass: "bold",
    },
    {
      dataField: "nombre",
      caption: "Nombres",
      cssClass: "bold",
    },
    {
      dataField: "apellidos",
      caption: "Apellidos",
      cssClass: "bold",
    },
    {
      dataField: "cedula",
      caption: "Identificacion",
      cssClass: "bold",
    },
    {
      dataField: "telefono",
      caption: "Telefono",
      cssClass: "bold",
    },
    {
      dataField: "correo",
      caption: "Correo",
      cssClass: "bold",
    },
  ];

  const buttons = {
    //edit: (rowData: Cajas) =>
    //  !CheckPermissions(auth, [0])
    //    ? Router.push({
    //        pathname: "/solicitude/edit/" + (rowData.id as string),
    //      })
    //    : toast.error("No puedes acceder"),
    //delete: async (rowData: Cajas) => {
    //  CheckPermissions(auth, [0])
    //    ? showConfirmModal(rowData.id)
    //    : toast.error("No puedes eliminar una Solicitud");
    //},
    //download: (rowData: Cajas) =>
    //  !CheckPermissions(auth, [0])
    //    ? Router.push({
    //        pathname: "/solicitude/print/" + (rowData.id as string),
    //      })
    //    : toast.error("No puedes acceder"),
  };
  return (
    <>
      <title>Pagos | "Oh my dog"</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-blue-100">
          <div className="bg-white w-5/6 h-5/6 mx-auto">
            <div className="mt-6">
              <p className="md:text-4xl text-xl text-center pt-5 font-extrabold text-blue-500">
                Gestion de clientes
              </p>
            </div>

            <Button
              className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-3 text-center mx-2 mb-2 mt-3 dark:focus:ring-blue-900"
              onClick={() =>
                CheckPermissions(auth, [0, 1])
                  ? Router.push({ pathname: "/clients/create" })
                  : toast.info("No puede ingresar solicitudes")
              }
            >
              Crear cliente
            </Button>
            <div className="p-2">
              <TreeTable
                keyExpr="id"
                dataSource={tableData}
                columns={columns}
                searchPanel={true}
                buttons={buttons}
                colors={{ headerBackground: "#F8F9F9", headerColor: "#466cf2" }}
                buttonsFirst
                paging
                showNavigationButtons
                showNavigationInfo
                pageSize={10}
                infoText={(actual, total, items) =>
                  `Página ${actual} de ${total} (${items} solicitudes)`
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientPage;
