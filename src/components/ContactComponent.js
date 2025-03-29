import React from "react";
import { MapPin, MessageCircle } from "lucide-react";

function ContactComponent() {
  return (
    <section className="contactContainer">
      <h2>¿Dónde encontrarnos?</h2>

      <article className="informationContact">
        <span className="whatsappContact">
            <MessageCircle size={24} color="green"/>
            +542364512745
        </span>
        <span className="address">
          <MapPin
            size={24}
            color="red"
          />
          Av. Roque Sáenz Peña 192{" "}
        </span>
      </article>

      <iframe
        title="Delamuu Ubicación"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.8657486587555!2d-60.94702369061075!3d-34.58967760983677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b8eb000003613d%3A0x57046f57d6bb4b7f!2sDelamuu!5e0!3m2!1ses!2sco!4v1743226418664!5m2!1ses!2sco"
        width="400"
        height="300"
        className="map"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}

export default ContactComponent;
