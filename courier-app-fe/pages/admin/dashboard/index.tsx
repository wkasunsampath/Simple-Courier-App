import { Grid, Paper } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useAxios from "../../../hooks/useAxios";
import { Shipment } from "../../../utils/types";
import { useEffect, useState } from "react";
import ShipmentTable from "../../../components/ShipmentTable";

export default function Index() {
  const axios = useAxios();

  const [shipmentData, setShipmentData] = useState<Shipment[]>([]);

  useEffect(() => {
    axios.get<Shipment[]>("/all-shipments").then((data) => {
      if (data) {
        setShipmentData(data);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>My Shipments</title>
      </Head>

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", marginTop: "40px", justifyContent: "center", padding: "20px" }}>
          <h3 style={{ textAlign: "left" }}>All Shipments</h3>
          <ShipmentTable shipmentData={shipmentData} />
        </Paper>
      </Grid>
    </>
  );
}
