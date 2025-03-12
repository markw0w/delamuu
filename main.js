    //Todos los archivos JS conectan aquí
    //IMPORTACIONES
    //import { navFunctionality } from "./nav.js";
    //import { allRedirections } from "./redirections.js";

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded ejecutado');
        const backgroundContainer = document.getElementById('background-container');
        const images = [

        ];
        let currentImageIndex = 0;

        function changeBackgroundImage() {
            backgroundContainer.style.backgroundImage = `url('${images[currentImageIndex]}')`;
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }

        // Cambia la imagen cada 5 segundos
        setInterval(changeBackgroundImage, 5000);

        // Cambia la imagen inicial
        changeBackgroundImage();
        // navFunctionality();
        // console.log('navFunctionality ejecutado');

        // allRedirections();
        // console.log('allRedirections ejecutado');

        // comenzar();
        // console.log('comenzar ejecutado');

        // loginButton();
        // console.log('loginButton ejecutado');

        //Nueva lógica para mostrar el contenido después de la intro
        const intro = document.getElementById('intro');
        const body = document.body;
        // Cuando quieras mostrar el body
        document.body.style.display = "flex"; // o "flex"

        // console.log('Body:', body);

        intro.addEventListener('animationend', function() {
            console.log("la intro ha terminado");
            body.style.visibility = 'visible';
            body.style.opacity = 1;
            console.log('Body ahora visible:', body);
        });
    });

    // function comenzar() {
    //  const comenzar = document.querySelectorAll('#comenzarButton');

    //  if (comenzar) {
    //      comenzar.forEach(function(start) {
    //          start.addEventListener('click', () => {
    //              location.href = '/#presentation';
    //          });
    //      });
    //  }
    // }

    // export function loginButton() {
    //  const toAdmin = document.querySelectorAll('#toAdmin');
    //  const sectionForm = document.getElementById('sectionForm');
    //  const backButton = document.getElementById('backButton');

    //  if (toAdmin) {
    //      toAdmin.forEach(function(admin) {
    //          admin.addEventListener('click', () => {
    //              sectionForm.style.display = 'flex';
    //          });
    //      });
    //  }
    //  if (backButton) {
    //      backButton.addEventListener('click', () => {
    //          sectionForm.style.display = 'none';
    //      });
    //  }
    // }