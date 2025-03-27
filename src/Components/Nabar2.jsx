import { BiLeftArrowAlt, BiSync } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Navbar2({ title }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const syncData = () => {};
  return (
    <>
      <div className="bg-blue-900 dark:bg-slate-800 border-slate-500 dark:border-b w-full py-4 px-5 flex justify-between">
        <div className="flex gap-3 items-center">
          <button onClick={goBack}>
            <BiLeftArrowAlt color="#fff" size={30} />
          </button>
          <h1 className="text-white font-medium text-xl uppercase">{title}</h1>
        </div>
        <button onClick={syncData}>
          <BiSync color="#fff" size={30} />
        </button>
      </div>
    </>
  );
}
