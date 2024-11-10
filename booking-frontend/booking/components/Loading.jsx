import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


function Loading() {

    return (<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress sx={{ color: "#be4bdb" }} />
    </Box>)
  }
  
  export default Loading;


