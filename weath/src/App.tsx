import { Button } from "@/components/ui/button"
import { CircleFadingArrowUpIcon } from "lucide-react"
import { BrowserRouter } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen items-center justify-center">
        <Button variant="outline" size="lg">
          <CircleFadingArrowUpIcon className="mr-2" />
          Hello World
        </Button>
      </div>
    </BrowserRouter>
  )
}

export default App