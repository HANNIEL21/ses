import { Button } from "@/components/ui/button"
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const User = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <section className="p-5 rounded-xl bg-muted md:min-w-xl flex items-center gap-4">
        <div className="bg-background w-[80px] h-[80px] md:w-[120px] md:h-[100px] flex items-center justify-center rounded-xl font-bold uppercase text-3xl text-center">
          <h1>{user?.firstname.charAt(0) + "" + user?.lastname.charAt(0)}</h1>
        </div>
        <div className="w-full">
          <h2 className="font-semibold md:text-2xl">{user?.firstname + " " + user?.lastname}</h2>
          <p className="text-xs">{user?.matno}</p>
          <div className="flex justify-end w-full mt-2">
            <Button className="font-bold" onClick={() => navigate('/user/appraise')}>Appraise</Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default User