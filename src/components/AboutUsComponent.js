import React from "react";

function AboutUsComponent() {
  return (
    <article className="aboutUsContainer" id="nosotros">
      <h2>Sobre nosotros</h2>
      <div className="blurBackground"></div>
      <div className="titleAboutUs">
        <p className="informationAboutUs">
          En el corazón de Junín, Buenos Aires, creamos experiencias dulces que
          van más allá del paladar.
        </p>
        <p className="informationAboutUs">
          Somos apasionados por la calidad y la tradición artesanal, ofreciendo
          yogures cremosos, helados irresistibles, açaí lleno de energía y las
          combinaciones más divertidas de candy. <br/> Cada producto está elaborado
          con ingredientes seleccionados y mucho amor, para que disfrutes un
          sabor auténtico y una experiencia única.
        </p>
        <p className="informationAboutUs">
          Porque sabemos que los mejores momentos siempre vienen con algo dulce,
          te invitamos a compartir los tuyos con nosotros.
        </p>
      </div>
    </article>
  );
}

export default AboutUsComponent;
