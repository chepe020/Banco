import { useState } from "react"
import toast from "react-hot-toast"
import { deposiAdd } from "../../../services/api"

export const useDeposito = () => {
  const [isLoading, setIsLoading] = useState(false)

  const addDeposito = async (noAccount, monto) => {
    setIsLoading(true)

    const response = await deposiAdd({ noAccount, monto })

    setIsLoading(false)

    if (response.error) {
      return toast.error(
        response?.e?.response?.data?.message || "Error al realizar el depósito."
      )
    }

    toast.success("¡Depósito exitoso!")
  }

  return {
    addDeposito,
    isLoading,
  }
}
