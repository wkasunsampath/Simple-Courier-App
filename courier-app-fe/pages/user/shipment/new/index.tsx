import { Button, FormControl, Grid, Paper, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useAxios from "../../../../hooks/useAxios";

export default function Index() {
  const router = useRouter();
  const axios = useAxios();

  const [weight, setWeight] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  const createShipment = async (e) => {
    e.preventDefault();
    const res = await axios.post<{ shipmentId: string }>(
      "/shipment/create",
      {
        weight,
        recipientName,
        recipientAddress,
        collectionAddress,
        instructions,
      },
      "Shipment was created successfully. One of our agents will contact you soon.",
    );
    if (res) {
      router.push(`/user/shipment/${res.shipmentId}`);
    }
  };

  return (
    <>
      <Head>
        <title>Create Shipment</title>
      </Head>

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Paper sx={{ width: "50%", marginTop: "100px", justifyContent: "center", padding: "20px" }}>
          <h3 style={{ textAlign: "left" }}>Create Shipment</h3>
          <div>
            <form onSubmit={createShipment}>
              <FormControl sx={{ mt: 4, width: "100%" }}>
                <TextField
                  label="Recipient Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Shipment Weight (KG)"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Recipient Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Collection Point Address"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={collectionAddress}
                  onChange={(e) => setCollectionAddress(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Special Instructions"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </FormControl>
              <Button variant="contained" size="small" sx={{ mt: 3, width: "100%" }} type="submit" disableElevation>
                Create Shipment
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
