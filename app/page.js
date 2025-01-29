import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <>
      <div className="flex flex-col gap-4 justify-center items-center text-white h-[44vh] ">
        <div className="font-bold text-3xl flex gap-2 justify-center items-center">
        FundBridge<span><img className="invertImg" width={60} src="/tea.gif" alt="" /></span>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and followers.
        </p>
        <div>
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
          </Link>
          <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>

      </div>
      <div className="bg-white h-1 w-full opacity-5">
      </div>
      <div className="text-white container mx-auto">
        <h1 className="text-2xl text-center font-bold mb-16 mt-10">Your Fans can Fund you </h1>
        <div className="flex gap-5 justify-around">
          <div className="item flex flex-col items-center">
            <img src="group.gif" className="bg-slate-400 rounded-full p-2" width={88} alt="gif" />
            <p className="font-bold">Fund Your Projects</p>
            <p className="text-center">Your fans are available for you</p>
          </div>
          <div className="item flex flex-col items-center">
            <img src="coin.gif" className="bg-slate-400 rounded-full p-2" width={88} alt="gif" />
            <p className="font-bold">Fund Your Projects</p>
            <p className="text-center">Your fans are available for you</p>
          </div>
          <div className="item flex flex-col items-center">
            <img src="man.gif" className="bg-slate-400 rounded-full p-2" width={88} alt="gif" />
            <p className="font-bold">Fund Your Projects</p>
            <p className="text-center">Your fans are available for you</p>
          </div>

        </div>
      </div>
      <div className="bg-white h-1 w-full opacity-5 mt-16">
      </div>
      <div className="text-white container mx-auto pb-40">
        <h1 className="text-2xl text-center font-bold mb-16 mt-10">Learn more about us</h1>
        <div className="flex gap-5 justify-around">
          <div className="item flex flex-col items-center">
            <img src="group.gif" className="bg-slate-400 rounded-full p-2" width={88} alt="gif" />
            <p className="font-bold">Fund Your Projects</p>
            <p className="text-center">Your fans are available for you</p>
          </div>
          <div className="item flex flex-col items-center">
            <img src="coin.gif" className="bg-slate-400 rounded-full p-2" width={88} alt="gif" />
            <p className="font-bold">Fund Your Projects</p>
            <p className="text-center">Your fans are available for you</p>
          </div>
          <div className="item flex flex-col items-center">
            <img src="man.gif" className="bg-slate-400 rounded-full p-2" width={88} alt="gif" />
            <p className="font-bold">Fund Your Projects</p>
            <p className="text-center">Your fans are available for you</p>
          </div>

        </div>
      </div>
    </>
  );
}
