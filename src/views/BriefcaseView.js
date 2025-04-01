import React, { useState, useEffect } from "react";

function BriefcaseView() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Opcional: podrías hacer una consulta para verificar que existe el PDF
    fetch("https://delamuu.com/briefcase/get-briefcase")
      .then((response) => {
        if (!response.ok) throw new Error("No se encontró el archivo");
        return response.blob();
      })
      .then((blob) => {
        // Si lo deseas, puedes crear un URL temporal con URL.createObjectURL
        const pdfURL = URL.createObjectURL(blob);
        const iframe = document.getElementById("pdfViewer");
        if (iframe) {
          iframe.src = pdfURL;
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el PDF:", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Cargando PDF...</p>;

  return (
    <section className="briefcaseFatherContainer">
      <iframe
        id="pdfViewer"
        src="https://delamuu.com/briefcase/get-briefcase"
        width="100%"
        height="600px"
        title="Carta PDF"
      ></iframe>
    </section>
  );
}

export default BriefcaseView;
