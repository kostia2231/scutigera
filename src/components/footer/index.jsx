import { Link } from "react-router-dom";
// import S from "../../assets/svg/Scutigera.svg";

export default function Footer() {
  return (
    <footer className="opacity-40">
      <div className="relative flex flex-col items-center justify-center gap-1 max-[640px]:p-2 pb-5 pt-20 max-[640px]:pt-20 max-[640px]:pb-10 z-10">
        {/* <div>
          <img className="w-[250px] max-[640px]:w-[200px]" src={S} alt="" />
        </div> */}
        <div className="flex gap-5 max-[640px]:gap-5">
          <Link to="/about">
            <div className="pointer underline-offset-[3px] decoration-[1.5px] hover:underline active:opacity-70 max-[640px]:hover:no-underline">
              ABOUT
            </div>
          </Link>
          <Link to="/shipping">
            <div className="pointer underline-offset-[3px] decoration-[1.5px] hover:underline active:opacity-70 max-[640px]:hover:no-underline">
              SHIPPING/RETURNS
            </div>
          </Link>
          <Link to="/terms">
            <div className="pointer underline-offset-[3px] decoration-[1.5px] hover:underline active:opacity-70 max-[640px]:hover:no-underline">
              PRIVACY POLICY
            </div>
          </Link>
          <Link to="/impressum">
            <div className="pointer underline-offset-[3px] decoration-[1.5px] hover:underline active:opacity-70 max-[640px]:hover:no-underline">
              IMPRESSUM
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
