import { Badge, Box, Grid, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants/constants.js";
import StatsBox from "../components/StatsBox.jsx";

async function getData(query, endpoint, token) {
  if (!query) {
    query = "";
  }

  let res = await axios({
    url: BASE_URL + `/admin/order${query}`,
    method: "get",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyZWFiYTQzNDk0OTgxNDc3ZjVhNzkiLCJpYXQiOjE2ODAyMzg3ODN9.zyLneanO_RUOdLOeUF3Z7nc62EfjcKd6G1Ypx265pbo`,
    },
  });
  return res.data;
}

async function getProductData(query, endpoint, token) {
  if (!query) {
    query = "";
  }

  let res = await axios({
    url: BASE_URL + `/admin/product${query}`,
    method: "get",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIyZWFiYTQzNDk0OTgxNDc3ZjVhNzkiLCJpYXQiOjE2ODAyMzg3ODN9.zyLneanO_RUOdLOeUF3Z7nc62EfjcKd6G1Ypx265pbo`,
    },
  });
  return res.data;
}
export default function Dashboard({ user }) {
  const [productData, setproductData] = useState([]);
  const [data, setData] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalEarning, seTotalEarnings] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [outofstcok, setOutOfStock] = useState(0);
  const [n, setn] = useState(0);
  const [vit, setvit] = useState(0);
  const [ayurveda, setayurveda] = useState(0);
  const [food, setFood] = useState(0);



  useEffect(() => {
    getData().then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    let filtered = data.filter((el) => el.status === "Order Placed");
    setPendingOrders(filtered.length);
  }, [data]);

  useEffect(() => {
    let sum = 0;
    data.forEach((el) => {
      if (el.status == "delivered") {
        sum += el.price;
      }
    });
    seTotalEarnings(sum);
  }, [data]);

  //   useEffect
  //   (() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  useEffect(() => {
    getProductData().then((res) => {
      setproductData(res.data);
    });
  }, []);

  useEffect(() => {
    var count = 0;
    var n = 0;
    var food = 0;
    var ayurveda = 0;
    var vit = 0;

    productData.forEach((el) => {
      if (el.stock === 0) {
        count++;
      }
      if (el.category === "Nutrients") {
        n++;
      }

      if (el.category === "Food") {
        food++;
      }

      if (el.category === "Vitamins") {
        vit++;
      }

      if (el.category === "Ayurveda") {
        ayurveda++;
      }
    });
    setOutOfStock(count);
    setFood(food)
    setayurveda(ayurveda)
    setvit(vit)
    setn(n)
  }, [productData]);

  return (
    <Box w={"100%"}>
      <Badge colorScheme={"teal"} fontSize={"lg"} m={8}>
        DASHBOARD
      </Badge>

      <Heading textAlign={"left"} color={"black"} m={8}>
        ORDERS
      </Heading>
      <Grid
        gap={6}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
      >
        <StatsBox
          name={"Total orders"}
          br={6}
          size={300}
          color={"white"}
          image={"https://www.svgrepo.com/show/374750/orders.svg"}
          bcolor={"teal"}
          count={data.length}
        />

        <StatsBox
          name={"Pending orders"}
          br={6}
          size={300}
          color={"black"}
          image={"https://www.svgrepo.com/show/374750/orders.svg"}
          bcolor={"cyan"}
          count={pendingOrders}
        />

        <StatsBox
          name={"Total Earnings $"}
          br={6}
          size={300}
          color={"black"}
          image={"https://www.svgrepo.com/show/500409/money.svg"}
          classname={"lush"}
          bcolor={"green"}
          count={totalEarning}
        />
      </Grid>

      <Heading textAlign={"left"} color={"black"} m={8}>
        PRODUCTS
      </Heading>
      <Grid
        gap={6}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
      >
        <StatsBox
          name={"Total products"}
          br={6}
          size={300}
          color={"white"}
          image={"https://www.svgrepo.com/show/498969/menu2.svg"}
          bcolor={"teal"}
          count={productData.length}
        />

        <StatsBox
          name={"Out of stock"}
          br={6}
          size={300}
          color={"black"}
          image={"https://www.svgrepo.com/show/489639/unavailable.svg"}
          bcolor={"cyan"}
          count={outofstcok}
        />
      </Grid>
      <Heading textAlign={"left"} color={"black"} m={8}>
        CATEGORIES
      </Heading>
      <Grid
        gap={6}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
      >
        <StatsBox
          name={"Vitamins"}
          br={6}
          size={300}
          color={"white"}
          image={
            "data:image/jpeg;base64,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"
          }
          bcolor={"teal"}
          count={vit}
        />

        <StatsBox
          name={"Food and Drinks"}
          br={6}
          size={300}
          color={"black"}
          image={
            "data:image/png;base64,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"
          }
          classname={"cyan"}
          bcolor={"cyan"}
          count={food}
        />

        <StatsBox
          name={"Ayurveda"}
          br={6}
          size={300}
          color={"black"}
          image={
            "https://e7.pngegg.com/pngimages/371/390/png-clipart-medicine-health-care-pharmaceutical-drug-ayurveda-health-traditional-medicine-medical.png"
          }
          classname={"lush"}
          bcolor={"green"}
          count={ayurveda}
        />

        <StatsBox
          name={"Nutrients"}
          br={6}
          size={300}
          color={"black"}
          image={
            "https://w7.pngwing.com/pngs/336/184/png-transparent-dietary-supplement-computer-icons-nutrition-health-health-food-text-nutrition.png"
          }
          bcolor={"cyan"}
          count={n}
        />
      </Grid>
    </Box>
  );
}
