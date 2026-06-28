import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderSummary from "../components/OrderSummary";
import { isNonEmpty, isPhone, isPincode } from "../utils/validators";

const CheckoutPage = () => {
  const { items } = useSelector((store) => store.cartReducer);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    pincode: "",
  });
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const cartTotal = items.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1),
    0
  );
  const totalMRP = items.reduce(
    (sum, i) => sum + (Number(i.originalPrice) || 0) * (Number(i.quantity) || 1),
    0
  );

  const errors = useMemo(
    () => ({
      name: !isNonEmpty(form.name) ? "Name is required" : "",
      phone: !isNonEmpty(form.phone)
        ? "Mobile number is required"
        : !isPhone(form.phone)
        ? "Enter a valid 10-digit mobile number"
        : "",
      address: !isNonEmpty(form.address) ? "Address is required" : "",
      landmark: !isNonEmpty(form.landmark) ? "Landmark is required" : "",
      pincode: !isNonEmpty(form.pincode)
        ? "Pincode is required"
        : !isPincode(form.pincode)
        ? "Enter a valid 6-digit pincode"
        : "",
    }),
    [form]
  );
  const isValid = Object.values(errors).every((e) => !e);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const handleProceed = () => {
    setTouched({
      name: true,
      phone: true,
      address: true,
      landmark: true,
      pincode: true,
    });
    if (!isValid) {
      toast({
        title: "Please complete all fields",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const date = new Date();
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const { name, phone, address, landmark, pincode } = form;

    const newItem = items.map((ele) => ({
      image: ele.image,
      title: ele.title,
      description: ele.description,
      price: ele.price,
      originalPrice: ele.originalPrice,
      sizes: ele.sizes,
      status: "Order Placed",
      date: dateString,
      category: ele.category,
      rating: ele.rating,
      review: ele.review,
      flavour: ele.flavour,
      tags: ele.tags,
      brand: ele.brand,
      stock: ele.stock,
      adminId: ele.adminId,
      quantity: ele.quantity,
      pid: ele.pid,
      userId: ele.userId,
      address: `${name} ${phone} ${address} ${landmark} ${pincode}`,
      delivery: "5",
      payment: "dummy",
    }));

    localStorage.setItem("newItem", JSON.stringify(newItem));
    navigate("/payment");
  };

  return (
    <Container maxW="7xl" py={{ base: 6, md: 10 }}>
      <Heading size="lg" mb={6}>
        Delivery Details
      </Heading>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 360px" }} gap={8} alignItems="start">
        <GridItem
          bg="white"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          boxShadow="sm"
          p={{ base: 5, md: 8 }}
        >
          <Flex
            as="form"
            direction="column"
            gap={5}
            onSubmit={(e) => {
              e.preventDefault();
              handleProceed();
            }}
          >
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <FormControl isRequired isInvalid={touched.name && !!errors.name}>
                <FormLabel>Full name</FormLabel>
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={touched.phone && !!errors.phone}>
                <FormLabel>Mobile number</FormLabel>
                <Input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={set("phone")}
                  onBlur={blur("phone")}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired isInvalid={touched.address && !!errors.address}>
              <FormLabel>Address</FormLabel>
              <Textarea
                placeholder="House no., street, area"
                value={form.address}
                onChange={set("address")}
                onBlur={blur("address")}
                rows={3}
              />
              <FormErrorMessage>{errors.address}</FormErrorMessage>
            </FormControl>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
              <FormControl isRequired isInvalid={touched.landmark && !!errors.landmark}>
                <FormLabel>Landmark</FormLabel>
                <Input
                  placeholder="Nearby landmark"
                  value={form.landmark}
                  onChange={set("landmark")}
                  onBlur={blur("landmark")}
                />
                <FormErrorMessage>{errors.landmark}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={touched.pincode && !!errors.pincode}>
                <FormLabel>Pincode</FormLabel>
                <Input
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit pincode"
                  value={form.pincode}
                  onChange={set("pincode")}
                  onBlur={blur("pincode")}
                />
                <FormErrorMessage>{errors.pincode}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <Button type="submit" size="lg" mt={1} display={{ base: "flex", lg: "none" }}>
              Continue to Payment
            </Button>
          </Flex>
        </GridItem>

        <GridItem position={{ lg: "sticky" }} top="120px">
          <OrderSummary totalMRP={totalMRP} cartTotal={cartTotal}>
            <Button w="full" size="lg" onClick={handleProceed}>
              Continue to Payment
            </Button>
          </OrderSummary>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
