export default function About() {
  return (
    <div className="grid grid-cols-2 max-[640px]:grid-cols-1 p-20 max-[640px]:p-0 max-[640px]:pt-20 max-[640px]:flex-col min-[1275px]:px-[100px] max-[640px]:px-4">
      <div></div>
      <div className="pl-2 max-[640px]:pl-0">
        <div className="font-bold">ABOUT SCUTIGERA</div>
        <div>
          Scutigera is a conceptual art project where fashion acts as the
          primary medium of expression. Each new product or photographic series
          contributes to an ongoing narrative, enriching a singular story with
          layers of meaning and artistic exploration.
        </div>
        <br />
        <div>
          Inspired by the creator’s personal experiences and reflections,
          Scutigera explores themes of contradiction and complexity.
        </div>
        <br />
        <div>
          For collaboration inquiries or general questions:
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="mailto:info@scutigera.online"
          >
            <br />
            info@scutigera.online
          </a>
          {" or "}
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="https://www.instagram.com/scutigera.online/"
          >
            Instagram
          </a>
          .
        </div>
      </div>
    </div>
  );
}
