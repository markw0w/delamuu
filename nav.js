//Funcionalidad de todos los NAV
import { burguerMenu } from "./burguerMenu.js";

export function navFunctionality(){
    //Todos los botones se expresan en esta funcion
    allButtons();
    burguerMenu();
}

//Aquí estan todos los botones del nav
function allButtons(){
    const myLogo = document.querySelectorAll('#toIndex')
    const contact = document.querySelectorAll('#toContact')
    const briefcase = document.querySelectorAll('#toBriefcase')
    const aboutUs = document.querySelectorAll('#toAboutUs')
    const logout = document.querySelectorAll('#logout')

    if(myLogo || contact || briefcase || aboutUs || logout){
        myLogo.forEach(function(logo){
            logo.addEventListener('click', () => {
                location.href = '/'
            })
        })
        contact.forEach(function(contact){
            contact.addEventListener('click', () => {
                location.href = '/#contactSection'
            })
        })
        briefcase.forEach(function(briefcase){
            briefcase.addEventListener('click', () => {
                location.href = './catalogo'
            })
        })
        aboutUs.forEach(function(aboutUs){
            aboutUs.addEventListener('click', () => {
                location.href = '/#presentation'
            })
        })
        logout.forEach(function(logout){
            logout.addEventListener('click', () => {
                location.href = '/'
            })
        })
    }
}