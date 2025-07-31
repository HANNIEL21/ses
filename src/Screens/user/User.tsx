import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const User = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <section className="p-5 rounded-xl bg-muted md:min-w-xl flex items-center gap-4">
        <div className="bg-background w-[80px] h-[80px] md:w-[120px] md:h-[100px] flex items-center justify-center rounded-xl font-bold uppercase text-3xl text-center">
          <h1>hi</h1>
        </div>
        <div className="w-full">
          <h2 className="font-semibold md:text-2xl">Hanniel Daniel</h2>
          <p className="text-xs">De.2024/PT/0600</p>
          <div className="flex justify-end w-full mt-2">
            <Button className="font-bold" onClick={()=> navigate('/')}>Appraise</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default User