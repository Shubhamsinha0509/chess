import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate(); 
    return <div className="flex justifty-center">
        <div className="pt-20">
            <div className="grid grid-cols-1 gap-4 
            md:grid-cols-2">
                <div className="flex justify-center">
                <img
  src="/chessboard-img.jpeg"
  alt="Chessboard"
  className="w-full max-w-[500px] h-auto rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] 
  hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-shadow duration-300 ease-in-out object-cover"
  srcSet="
    /chessboard-img.jpeg 125w,
    /chessboard-img.jpeg 250w,
    /chessboard-img.jpeg 500w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
/>

                </div>
                <div >
                    <h1 className="text-5xl font-bold text-white">
                        Play Chess Online on the #1 Site!
                    </h1>
                    <div className="mt-6">
                        <Button onClick={() => navigate("/game")}>
                            Play online
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}