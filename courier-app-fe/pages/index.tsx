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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const userData = await axios.post<{ token: string; user: UserData }>(
      "login",
      {
        email,
        password,
      },
      "Login successful",
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
        <title>Login</title>
      </Head>

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Paper sx={{ width: "50%", marginTop: "100px", justifyContent: "center", padding: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Login to Courier App</h3>
          <div>
            <form onSubmit={login}>
              <FormControl sx={{ mt: 4, width: "100%" }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button variant="contained" size="small" sx={{ mt: 3, width: "100%" }} type="submit" disableElevation>
                Login
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1, width: "100%" }}
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </>
  );
}
