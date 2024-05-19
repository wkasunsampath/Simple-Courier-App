import { useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Button, FormControl, Grid, Paper, TextField } from "@mui/material";
import Head from "next/head";
import { AuthContext } from "../providers/AuthProvider";
import { UserData } from "../utils/types";
import { useRouter } from "next/router";

export default function Index() {
  const axios = useAxios();
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const userData = await axios.post<{ token: string; user: UserData }>(
      "register",
      {
        name,
        email,
        password,
        repeatPassword,
        mobile,
        address,
      },
      "User account was created successfully",
    );
    if (userData) {
      auth?.login(userData.user, userData.token);
      if (userData.user.type === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Paper sx={{ width: "50%", marginTop: "100px", justifyContent: "center", padding: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Register to Courier App</h3>
          <div>
            <form onSubmit={register}>
              <FormControl sx={{ mt: 4, width: "100%" }}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Retype Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="password"
                  autoComplete="new-password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Mobile No."
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, width: "100%" }}>
                <TextField
                  label="Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <Button variant="contained" size="small" sx={{ mt: 3, width: "100%" }} type="submit" disableElevation>
                Register
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
