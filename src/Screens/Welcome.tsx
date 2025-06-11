import Mood from "@/components/Mood"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Props = {}

const Welcome = (props: Props) => {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col">
            <header className="flex gap-4 p-4 px-10 justify-end">
                <Mood />
                <Button variant="outline" onClick={() => navigate('/login')}>Login <LogIn /> </Button>
            </header>

            <div className="flex-1 flex items-center justify-center">
                <h1 className="dark:text-white font-bold text-5xl text-center">
                    Welcome to SES. Login to continue.
                </h1>
            </div>
        </div>
    )
}

export default Welcome