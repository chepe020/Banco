import { useState, useEffect } from "react"
import { deposiView } from "../../../services/api"
import toast from "react-hot-toast"

export const useViewDeposit = () => {
  const [depositos, setDepositos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDepositos = async () => {
    setIsLoading(true)
    const response = await deposiView()
    setIsLoading(false)

    if (response.error) {
      toast.error("Error al cargar los depósitos")
      return
    }

    setDepositos(response.data.depositos || []) 
  }

  useEffect(() => {
    fetchDepositos()
  }, [])

  return { 
    depositos, 
    isLoading, 
    fetchDepositos 
  }
}
