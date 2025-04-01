import React, { useState, useEffect } from "react";

function BriefcaseView() {
  const [briefcases, setBriefcases] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://delamuu.com/briefcase/get-briefcase")
      .then((response) => response.json())
      .then((data) => {
        setBriefcases(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Cargando...</p>;
  if (briefcases.length === 0) return <p>No se encontraron cartas.</p>;

  return (
    <section className="briefcaseFatherContainer">
      {briefcases.map((briefcaseItem, index) => (
        <iframe
          src={`https://delamuu.com${briefcaseItem.file_path}`}
          width="100%"
          height="600px"
          title="Carta PDF"
        ></iframe>
      ))}
    </section>
  );
}

export default BriefcaseView;
