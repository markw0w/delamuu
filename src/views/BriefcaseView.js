import React, { useState, useEffect } from "react";

function BriefcaseView() {
  const [pdfURL, setPdfURL] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://delamuu.com/briefcase/get-briefcase-user")
      .then((response) => response.blob()) // Convertimos la respuesta en un archivo
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPdfURL(url);
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
      {pdfURL ? (
        <iframe
          src={pdfURL}
          width="100%"
          height="600px"
          title="Carta PDF"
        ></iframe>
      ) : (
        <p>No se encontró ningún PDF.</p>
      )}
    </section>
  );
}

export default BriefcaseView;
