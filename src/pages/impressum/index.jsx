export default function Impressum() {
  return (
    <div className="grid grid-cols-2 max-[640px]:grid-cols-1 p-20 max-[640px]:p-0 max-[640px]:pt-20 max-[640px]:flex-col min-[1275px]:px-[100px] max-[640px]:px-4">
      <div></div>
      <div className="pl-2 max-[640px]:pl-0">
        <div className="font-bold uppercase">Angaben gemäß § 5 TMG</div>
        <div>Vladyslav Senko Nostitzstr. 26, 10961, Berlin, Deutschland.</div>
        <br />
        <div className="font-bold uppercase">Kontakt</div>
        <div>
          E-Mail:{" "}
          <a
            className="pointer underline-offset-[3px] decoration-[1.5px] active:opacity-70 underline"
            href="mailto:info@scutigera.online"
          >
            info@scutigera.online
          </a>{" "}
        </div>
        <br />
        <div className="font-bold uppercase">
          Umsatzsteuer-Identifikationsnummer
        </div>
        <div>Nicht vorhanden (Kleinunternehmer nach § 19 UStG)</div>
        <br />
        <div className="font-bold uppercase">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </div>
        <div>Vladyslav Senko</div>
      </div>
    </div>
  );
}
