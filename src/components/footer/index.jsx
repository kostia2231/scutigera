import S from "../../assets/svg/Scutigera.svg";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1">
        <div>
          <img className="w-[450px]" src={S} alt="" />
        </div>
        <div className="flex gap-20">
          <div>ABOUT</div>
          <div>TERMS</div>
          <div>INSTAGRAM</div>
        </div>
      </div>
    </>
  );
}
