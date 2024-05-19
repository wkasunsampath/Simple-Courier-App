import { useRouter } from "next/router";
import { Shipment, ShipmentStatus } from "../utils/types";
import useAxios from "../hooks/useAxios";
import { useContext, useState } from "react";
import { FormControl, TextField, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";

export default function ShipmentData(props: { shipment: Shipment }) {
  const router = useRouter();
  const axios = useAxios();
  const auth = useContext(AuthContext);

  const [cost, setCost] = useState(props.shipment.cost);
  const [status, setStatus] = useState(props.shipment.status);
  const [deliveryPerson, setDeliveryPerson] = useState(props.shipment.deliveryPerson);
  const [collectedOn, setCollectedOn] = useState(
    props.shipment.collectedOn ? new Date(props.shipment.collectedOn).toISOString().split("T")[0] : null,
  );
  const [deliveredOn, setDeliveredOn] = useState(
    props.shipment.deliveredOn ? new Date(props.shipment.deliveredOn).toISOString().split("T")[0] : null,
  );

  const canUpdate = () => auth?.loggedUser?.type === "ADMIN";
  const canShow = (value: any) => auth?.loggedUser?.type === "ADMIN" || (auth?.loggedUser?.type === "USER" && value);

  const updateShipment = async () => {
    axios
      .put<Shipment>(
        `/shipment/${router.query.id}`,
        {
          cost,
          status,
          deliveryPerson,
          collectedOn: collectedOn ? new Date(collectedOn) : null,
          deliveredOn: deliveredOn ? new Date(deliveredOn) : null,
        },
        "Shipment was updated successfully",
      )
      .then((data) => {
        if (data) {
          router.push("/admin/dashboard");
        }
      });
  };

  return (
    <>
      <form onSubmit={updateShipment}>
        <FormControl sx={{ mt: 4, width: "100%" }}>
          <TextField
            label="Waybill No."
            variant="outlined"
            size="small"
            fullWidth
            required
            value={props.shipment.wayBillNumber}
            disabled
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2, width: "100%" }}>
          <InputLabel id="status-label">Shipment Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Shipment Status"
            onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
            disabled={!canUpdate()}
            size="small"
          >
            <MenuItem value={"PENDING"}>PENDING</MenuItem>
            <MenuItem value={"COLLECTING"}>COLLECTING</MenuItem>
            <MenuItem value={"DELIVERING"}>DELIVERING</MenuItem>
            <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 5, width: "100%" }}>
          <TextField
            label="Sender Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={props.shipment.owner.name}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Sender Email"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={props.shipment.owner.email}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Sender Mobile"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={props.shipment.owner.mobile}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Created On"
            variant="outlined"
            size="small"
            fullWidth
            required
            type="date"
            value={new Date(props.shipment.created_at)}
            disabled
          />
        </FormControl>

        <FormControl sx={{ mt: 5, width: "100%" }}>
          <TextField
            label="Recipient Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={props.shipment.recipientName}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Recipient Address"
            variant="outlined"
            multiline
            rows={4}
            size="small"
            fullWidth
            required
            value={props.shipment.recipientAddress}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Shipment Weight (KG)"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={props.shipment.weight}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Collection Address"
            variant="outlined"
            size="small"
            fullWidth
            required
            multiline
            rows={4}
            value={props.shipment.collectionAddress}
            disabled
          />
        </FormControl>
        <FormControl sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Instructions"
            variant="outlined"
            size="small"
            fullWidth
            required
            multiline
            rows={4}
            value={props.shipment.instructions}
            disabled
          />
        </FormControl>

        {canShow(cost) && (
          <FormControl sx={{ mt: 5, width: "100%" }}>
            <TextField
              label="Delivery Cost (LKR)"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              value={cost}
              disabled={!canUpdate()}
              onChange={(e) => setCost(parseFloat(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        )}
        {canShow(deliveryPerson) && (
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <TextField
              label="Delivery Person"
              variant="outlined"
              size="small"
              fullWidth
              value={deliveryPerson}
              disabled={!canUpdate()}
              onChange={(e) => setDeliveryPerson(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        )}
        {canShow(collectedOn) && (
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <TextField
              label="Collected On"
              variant="outlined"
              size="small"
              type="date"
              fullWidth
              value={collectedOn}
              onChange={(e) => setCollectedOn(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!canUpdate()}
            />
          </FormControl>
        )}
        {canShow(deliveredOn) && (
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <TextField
              label="Delivered On"
              variant="outlined"
              size="small"
              fullWidth
              type="date"
              value={deliveredOn}
              disabled={!canUpdate()}
              onChange={(e) => setDeliveredOn(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        )}
        {canUpdate() && (
          <Button variant="contained" size="small" sx={{ mt: 3, width: "100%" }} type="submit" disableElevation>
            Update Shipment
          </Button>
        )}
      </form>
    </>
  );
}
