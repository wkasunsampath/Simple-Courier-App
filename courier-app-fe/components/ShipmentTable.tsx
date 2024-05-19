import { Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Shipment } from "../utils/types";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function ShipmentTable(props: { shipmentData: Shipment[] }) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead>
          <TableRow>
            <TableCell>#WayBil</TableCell>
            <TableCell align="left">Recipient</TableCell>
            <TableCell align="left">Created On</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.shipmentData.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.wayBillNumber}
              </TableCell>
              <TableCell align="left">{row.recipientName}</TableCell>
              <TableCell align="left">{new Date(row.created_at).toLocaleDateString()}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ width: "100%" }}
                  disableElevation
                  onClick={() => router.push(`/${auth?.loggedUser?.type.toLowerCase()}/shipment/${row.id}`)}
                >
                  View Info
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.shipmentData.length === 0 && <p style={{ textAlign: "center", width: "100%" }}>No Data</p>}
    </TableContainer>
  );
}
