import { useContext } from "react";
import { ChildrenProps } from "../utils/types";
import { UiContext } from "../providers/UiProvider";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

const BaseLayout = ({ children }: { children: ChildrenProps }) => {
  const ui = useContext(UiContext);
  const auth = useContext(AuthContext);
  const router = useRouter();

  const logout = () => {
    if (confirm("Do you want to logout?")) {
      auth?.logout();
      router.push("/");
    }
  };

  return (
    <>
      {!ui?.isLoading && (
        <>
          {auth?.isLoggedIn && (
            <div className="appBar">
              <Link href={"/"}>
                <div>My Courier App</div>
              </Link>
              <div style={{ marginLeft: "auto" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {ui?.isLoading && (
                    <Box sx={{ mr: 3 }}>
                      <CircularProgress size={25} />
                    </Box>
                  )}
                  {auth.loggedUser?.type === "USER" && (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ width: "200px", mr: 2 }}
                      color="success"
                      fullWidth
                      disableElevation
                      disabled={router.route.includes("shipment/new")}
                      onClick={() => router.push("/user/shipment/new")}
                    >
                      Create Shipment
                    </Button>
                  )}
                  <Button variant="outlined" size="small" sx={{ width: "100px" }} onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div style={{ padding: "0px 60px 40px 60px" }}>{children}</div>
        </>
      )}
      <Toaster />
    </>
  );
};

export default BaseLayout;
