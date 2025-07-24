import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Text,
  Spinner,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Icon,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useDeposito, useViewDeposit } from "../../shared/hooks/deposit";
import {
  FaMoneyBillWave,
  FaLandmark,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const Deposit = () => {
  const [noAccount, setNoAccount] = useState("");
  const [monto, setMonto] = useState("");
  const { addDeposito, isLoading: loadingPost } = useDeposito();
  const { depositos, isLoading: loadingGet, fetchDepositos } = useViewDeposit(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noAccount || !monto) {
      return toast.error("Todos los campos son obligatorios.")
    }

    const success = await addDeposito(noAccount, parseFloat(monto))

    if (success !== false) {
      setNoAccount("");
      setMonto("");
      fetchDepositos();
    }
  }


  const bgColor = useColorModeValue("gray.50", "gray.900");
  const formBg = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("purple.700", "purple.300");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const inputBorderColor = useColorModeValue("gray.200", "gray.500");
  const buttonColorScheme = "purple";
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const cardHoverShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      color={textColor}
      px={{ base: 4, md: 8 }}
      py={{ base: 10, md: 14 }}
    >
      <Box
        bg={formBg}
        p={{ base: 6, md: 8 }}
        rounded="2xl"
        shadow="xl"
        w="full"
        maxW="md"
        mx="auto"
        mb={{ base: 10, md: 14 }}
        border="1px solid"
        borderColor={cardBorderColor}
        _hover={{ boxShadow: "2xl", transform: "translateY(-3px)" }}
        transition="all 0.3s ease-in-out"
      >
        <VStack as="form" spacing={6} onSubmit={handleSubmit}>
          <Heading
            size="lg"
            color={headingColor}
            display="flex"
            alignItems="center"
          >
            <Icon as={FaMoneyBillWave} mr={3} /> Realizar Depósito
          </Heading>

          <FormControl isRequired>
            <FormLabel color={textColor}>Número de Cuenta</FormLabel>
            <Input
              placeholder="Ej. 6489150304"
              value={noAccount}
              onChange={(e) => setNoAccount(e.target.value)}
              bg={inputBg}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              _focus={{
                borderColor: buttonColorScheme + ".500",
                boxShadow: `0 0 0 1px ${buttonColorScheme}.500`,
              }}
              borderColor={inputBorderColor}
              color={textColor}
              size="lg"
              borderRadius="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={textColor}>Monto a Depositar</FormLabel>
            <Input
              placeholder="Ej. 100.00"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              bg={inputBg}
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              _focus={{
                borderColor: buttonColorScheme + ".500",
                boxShadow: `0 0 0 1px ${buttonColorScheme}.500`,
              }}
              borderColor={inputBorderColor}
              color={textColor}
              size="lg"
              borderRadius="lg"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme={buttonColorScheme}
            w="full"
            isLoading={loadingPost}
            loadingText="Procesando Depósito..."
            size="lg"
            borderRadius="lg"
            leftIcon={<Icon as={FaLandmark} />}
            mt={4}
            _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
            transition="all 0.2s ease"
          >
            Depositar
          </Button>
        </VStack>
      </Box>

      <Box>
        <Heading size="lg" textAlign="center" mb={6} color={headingColor}>
          Historial de Depósitos
        </Heading>

        {loadingGet ? (
          <Flex justify="center" align="center" py={10}>
            <Spinner size="xl" color={buttonColorScheme + ".500"} />
          </Flex>
        ) : depositos.length === 0 ? (
          <Text textAlign="center" color={textColor} fontSize="lg" py={10}>
            No hay depósitos registrados aún.
          </Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 8 }}
            mt={4}
          >
            {depositos.map((dep) => (
              <Card
                key={dep._id}
                bg={cardBg}
                border="1px solid"
                borderColor={cardBorderColor}
                borderRadius="xl"
                shadow="md"
                _hover={{
                  shadow: cardHoverShadow,
                  transform: "translateY(-3px)",
                }}
                transition="all 0.3s ease-in-out"
              >
                <CardHeader pb={2}>
                  <Flex justify="space-between" align="center">
                    <Heading size="md" color={headingColor}>
                      <Icon as={FaLandmark} mr={2} /> Cuenta: {dep.noAccount}
                    </Heading>
                    <Badge
                      colorScheme={dep.state ? "green" : "red"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      <Flex align="center">
                        <Icon
                          as={dep.state ? FaCheckCircle : FaTimesCircle}
                          mr={1}
                        />
                        {dep.state ? "Activo" : "Inactivo"}
                      </Flex>
                    </Badge>
                  </Flex>
                </CardHeader>
                <CardBody pt={2} pb={2}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={useColorModeValue("green.600", "green.300")}
                    mb={2}
                  >
                    Monto: Q{parseFloat(dep.monto).toFixed(2)}
                  </Text>
                  <Text
                    fontSize="sm"
                    color={useColorModeValue("gray.600", "gray.300")}
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FaCalendarAlt} mr={2} />
                    Fecha:{" "}
                    {format(new Date(dep.createdAt), "PPP p", { locale: es })}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};
