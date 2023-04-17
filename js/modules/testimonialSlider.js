import TESTIMONIALS from "../data/testimonials.js";

const slideHandler = (() => {
    const slideImages = document.querySelectorAll(".slide-single-img");
    const slideNames = document.querySelectorAll(".slide-single-name");
    const slidePositions = document.querySelectorAll(".slide-single-position");
    const slideMessages = document.querySelectorAll(".slide-single-message");
    const dots = document.getElementsByClassName("slide-dot");
    const prevBtn = document.querySelector(".left");
    const nextBtn = document.querySelector(".right");

    const state = {
        index: 1
    }

    const init = () => {
        render()
        listeners()
    }

    const changeSlide = (num) => {
        let newIndex

        if (state.index + num > slideImages.length) {
            newIndex = 1
        } else if (state.index + num < 1) {
            newIndex = slideImages.length
        } else {
            newIndex = state.index + num
        }
        
        setState({ index: newIndex })
    }

    const listeners = () => {
        prevBtn.addEventListener("click", () => changeSlide(-1))
        nextBtn.addEventListener("click", () => changeSlide(1))
        
    }

    const setState = (obj) => {
        state.index = obj.index

        render()
    }

    const render = () => {
        for (let i = 0; i < slideImages.length; i++) {
            let newIndex = (state.index + i - 1) % slideImages.length
            slideImages[i].src =  TESTIMONIALS[newIndex].image
            slideNames[i].innerHTML = TESTIMONIALS[newIndex].name
            slidePositions[i].innerHTML = TESTIMONIALS[newIndex].postition
            slideMessages[i].innerHTML = TESTIMONIALS[newIndex].message
            
            dots[i].classList.remove("active")
        }
        
        if (state.index - 1 >= 0 && state.index - 1 <= dots.length - 1) {
            dots[state.index - 1].classList.add("active")
        }

        
    }

    return {
        init
    }
})()

export default slideHandler