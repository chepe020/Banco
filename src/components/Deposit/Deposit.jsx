import { useState } from "react"
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { useDeposito } from "../../hooks/depositos/useDeposito"

export const Deposit = () => {
  const [noAccount, setNoAccount] = useState("")
  const [monto, setMonto] = useState("")
  const { addDeposito, isLoading } = useDeposito()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!noAccount || !monto) {
      return toast.error("Todos los campos son obligatorios.")
    }

    await addDeposito(noAccount, parseFloat(monto))
    setNoAccount("")
    setMonto("")
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #1a1a2e, #3f0d66)"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box
        bg="blackAlpha.800"
        p={8}
        rounded="xl"
        shadow="2xl"
        w="full"
        maxW="sm"
      >
        <VStack as="form" spacing={6} onSubmit={handleSubmit}>
          <Heading
            size="lg"
            bgGradient="linear(to-r, purple.400, purple.600)"
            bgClip="text"
          >
            Realizar Depósito
          </Heading>

          <FormControl isRequired>
            <FormLabel>Número de Cuenta</FormLabel>
            <Input
              placeholder="Ej. 6489150304"
              value={noAccount}
              onChange={(e) => setNoAccount(e.target.value)}
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Monto</FormLabel>
            <Input
              placeholder="Ej. 100"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            w="full"
            isLoading={isLoading}
            loadingText="Procesando..."
          >
            Depositar
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}
