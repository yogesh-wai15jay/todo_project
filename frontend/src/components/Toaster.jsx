import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = (props) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme="light"
      position="top-center"
      className="toaster group"
      {...props}
    />
  )
}

export default Toaster;
