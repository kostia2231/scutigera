import { Link } from "react-router-dom";
import S from "../../assets/svg/Scutigera.svg";
import Terms from "../../pages/terms";

export default function Footer() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center gap-1 max-[640px]:p-2 pb-5 pt-20 max-[640px]:pt-20 max-[640px]:pb-10">
        <div>
          <img className="w-[250px] max-[640px]:w-[200px]" src={S} alt="" />
        </div>
        <div className="flex gap-5 max-[640px]:gap-5">
          <div>ABOUT</div>
          <Link to="/terms">
            <div>TERMS</div>
          </Link>
          <Link to="https://www.instagram.com/scutigeraa/">
            <div className="pointer underline-offset-[3px] decoration-[1.5px] hover:underline active:opacity-70 max-[640px]:hover:no-underline">
              INSTAGRAM
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
