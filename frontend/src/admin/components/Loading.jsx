import { Grid } from "@chakra-ui/react";
import Lottie from "react-lottie";

export default function Loading() {
  function config(url) {
    return {
      loop: true,
      autoplay: true,
      path: url,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  }

  return (
    <Grid
      placeItems={"center"}
      bg={"white"}
      w={"100%"}
      h={"100vh"}
    >
      <Lottie
        options={config(
          "https://assets3.lottiefiles.com/packages/lf20_kxsd2ytq.json"
        )}
        height={300}
        width={300}
      />
    </Grid>
  );
}