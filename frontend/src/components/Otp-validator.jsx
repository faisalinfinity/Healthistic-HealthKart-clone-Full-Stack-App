import {
  Modal,
  ModalOverlay,
  Button,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

export default function OtpModal({
  onOpen,
  isOpen,
  onClose,
  sendEmail,
  validate,
  email,
}) {
  const [enteredotp, setenteredotp] = useState("");
  const form = useRef();
  const [random, setRandom] = useState("");
  const [disable, setDisable] = useState(false);
  const [initialTime, setinitialTime] = useState(120000);
  const generateRandomOtp = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    setRandom("" + randomNum);
  };

  useEffect(() => {
    generateRandomOtp();
  }, []);
  let id;
  const Timeout = () => {
    id = setTimeout(() => {
      setDisable(false);
    }, 120000);
  };

  function CountdownTimer({ initialTime }) {
    const [remainingTime, setRemainingTime] = useState(initialTime);

    // Update the remaining time every second
    useEffect(() => {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
        setinitialTime((prev) => prev - 1000);
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    // Calculate the minutes and seconds remaining
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = ((remainingTime % 60000) / 1000).toFixed(0);

    // Format the remaining time as a string
    const timerString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return <Text> Resend in {timerString}</Text>;
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Please check your email {email} for OTP after clicking on send OTP
              .
            </Text>
            <br />
            <Input
              onChange={(e) => setenteredotp(e.target.value)}
              type="password"
              maxLength="4"
              placeholder={"XXXX"}
            ></Input>
            <br />
            <Box mt="10px" display="flex" gap="20px">
              <Button
                colorScheme={"green"}
                isDisabled={disable}
                onClick={() => {
                  setDisable(true);
                  setinitialTime(120000);
                  Timeout();
                  sendEmail(form);
                }}
              >
                {disable === true ? (
                  <CountdownTimer initialTime={initialTime} />
                ) : (
                  "Send OTP"
                )}
              </Button>
              <Button
                isDisabled={enteredotp.length !== 4}
                colorScheme={"teal"}
                onClick={() => validate(random, enteredotp)}
              >
                Validate
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form style={{ display: "none" }} ref={form}>
        <input value={random} name="otp" />
        <label>Message</label>
        <input value={email} type="email" name="email"></input>
        <textarea
          value={`The OTP for registration on Healthistic  `}
          name="message"
        />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}
