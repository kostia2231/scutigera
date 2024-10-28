import S from "../../assets/svg/Scutigera.svg";

export default function Footer() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center gap-1 max-[640px]:p-2 mb-5 pt-20 max-[640px]:pt-0">
        <div>
          <img className="w-[350px] max-[640px]:w-[250px]" src={S} alt="" />
        </div>
        <div className="flex gap-10 max-[640px]:gap-5">
          <div>ABOUT</div>
          <div>TERMS</div>
          <div>INSTAGRAM</div>
        </div>
      </div>
    </>
  );
}
