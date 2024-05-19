import { Grid, Paper } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { Shipment } from "../../../utils/types";
import ShipmentData from "../../../components/ShipmentData";

export default function Index() {
  const router = useRouter();
  const axios = useAxios();

  const [shipmentData, setShipmentData] = useState<Shipment | null>(null);

  useEffect(() => {
    if (router.query.id) {
      axios.get<Shipment>(`/shipment/${router.query.id}`).then((data) => {
        if (data) {
          setShipmentData(data);
        }
      });
    }
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>View Shipment</title>
      </Head>

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Paper sx={{ width: "50%", marginTop: "100px", justifyContent: "center", padding: "20px" }}>
          <h3 style={{ textAlign: "left" }}>View Shipment</h3>
          {shipmentData && <ShipmentData shipment={shipmentData} />}
        </Paper>
      </Grid>
    </>
  );
}
