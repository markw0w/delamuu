//Todas las redirecciones de botones y demás, se realizan aquí
export function allRedirections(){
    whatsappRedirection();
    instagramRedirection();
    facebookRedirection();
}

//Boton whatsapp
function whatsappRedirection(){
    const whatsapp = document.querySelectorAll('.whatsappIcon')

    if(whatsapp){
        whatsapp.forEach(function(wsp){
            wsp.addEventListener('click', () => {
                window.open(`https://wa.me/573012397022?text=¡Hola!%20Vengo%20de%20www.elbauldeseverina.com%20y%20quiero%20contactarme%20con%20ustedes%20`);
            })
        })
    }
}

//Boton instagram
function instagramRedirection(){
    const instagram = document.querySelectorAll('#instagramIcon')

    if(instagram){
        instagram.forEach(function(ig){
            ig.addEventListener('click', () => {
                location.href = 'https://www.instagram.com/elbauldeseverina/'
            })
        })
    }
}

//Boton facebook
function facebookRedirection(){
    const facebook = document.querySelectorAll('#facebookIcon')

    if(facebook){
        facebook.forEach(function(fb){
            fb.addEventListener('click', () => {
                location.href = 'https://www.facebook.com/elbauldeseverinamed'
            })
        })
    }
}



