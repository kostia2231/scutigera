import S from "../../assets/svg/Scutigera.svg";

export default function Footer() {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2">
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
