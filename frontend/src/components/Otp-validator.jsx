import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import PinInput from "./PinInput";

const OTP_WINDOW_MS = 120000;

function CountdownTimer({ initialTime }) {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - 1000, 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = ((remainingTime % 60000) / 1000).toFixed(0);
  return <span>Resend in {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</span>;
}

export default function OtpModal({
  isOpen,
  onClose,
  sendEmail,
  validate,
  email,
}) {
  const [enteredotp, setEnteredOtp] = useState("");
  const [random, setRandom] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [disable, setDisable] = useState(false);
  const form = useRef();
  const toast = useToast();

  const generateRandomOtp = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    setRandom("" + randomNum);
  };

  useEffect(() => {
    generateRandomOtp();
  }, []);

  const startCooldown = () => {
    setDisable(true);
    setTimeout(() => setDisable(false), OTP_WINDOW_MS);
  };

  const handleSendOtp = () => {
    startCooldown();
    setOtpSent(true);
    sendEmail(form);
    toast({
      title: "OTP sent",
      description: `A 4-digit code was sent to ${email}.`,
      status: "info",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const onChange = (inputData) => setEnteredOtp(inputData.join(""));

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent mx={4}>
          <ModalHeader pb={1}>
            <Flex direction="column" align="center" textAlign="center" gap={3} pt={3}>
              <Flex
                boxSize="56px"
                align="center"
                justify="center"
                borderRadius="full"
                bg="brand.50"
                color="brand.600"
              >
                <Icon as={MdMarkEmailRead} boxSize="28px" />
              </Flex>
              <Text fontSize="xl" fontWeight="700" color="ink.800">
                Verify your email
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="center" color="ink.400" fontSize="sm" mb={5}>
              {otpSent ? (
                <>
                  Enter the 4-digit code we sent to{" "}
                  <Text as="span" fontWeight="600" color="ink.700">
                    {email}
                  </Text>
                </>
              ) : (
                <>Click “Send OTP” to receive a verification code at {email}.</>
              )}
            </Text>

            <PinInput Type="number" length={4} inputBoxLength={1} onChange={onChange} />

            <Flex mt={6} gap={3} justify="center">
              <Button
                flex="1"
                variant="outline"
                isDisabled={disable}
                onClick={handleSendOtp}
              >
                {disable ? <CountdownTimer initialTime={OTP_WINDOW_MS} /> : "Send OTP"}
              </Button>
              <Button
                flex="1"
                isDisabled={enteredotp.length !== 4 || !otpSent}
                onClick={() => validate(random, enteredotp)}
              >
                Verify & Create
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <form style={{ display: "none" }} ref={form}>
        <input readOnly value={random} name="otp" />
        <input readOnly value={email} type="email" name="email" />
        <textarea
          readOnly
          value={`The OTP for registration on Healthistic  `}
          name="message"
        />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}
