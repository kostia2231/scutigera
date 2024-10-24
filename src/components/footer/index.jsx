import S from "../../assets/svg/Scutigera.svg";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 max-[640px]:p-2">
        <div>
          <img className="w-[450px] max-[640px]:w-[300px]" src={S} alt="" />
        </div>
        <div className="flex gap-20 max-[640px]:gap-10">
          <div>ABOUT</div>
          <div>TERMS</div>
          <div>INSTAGRAM</div>
        </div>
      </div>
    </>
  );
}
