import TESTIMONIALS from "../data/testimonials.js";

const slideHandler = (() => {
    const slideContainer = document.querySelector(".slide-container");
    const dotsGroup = document.querySelector(".dots-group");
    const prevBtn = document.querySelector(".left");
    const nextBtn = document.querySelector(".right");

    const state = {
        index: 0
    }

    const init = () => {
        initialRender()
        render()
        listeners()
    }

    const changeSlide = (action) => {
        let newIndex, num, length = TESTIMONIALS.length

        if (action === "prev") {
            num = -1
        } else if (action === "next") {
            num = 1
        }

        if (state.index + num > length - 1) {
            newIndex = 0
        } else if (state.index + num < 0) {
            newIndex = length - 1
        } else {
            newIndex = state.index + num
        }

        setState({ index: newIndex })
    }

    const listeners = () => {
        prevBtn.addEventListener("click", () => changeSlide("prev"))
        nextBtn.addEventListener("click", () => changeSlide("next"))
        
    }

    const setState = (obj) => {
        state.index = obj.index

        render()
    }

    const initialRender = () => {
        let slidesString = "", dotsString = ""
        for (let i = 0; i < TESTIMONIALS.length; i++) {
            dotsString += `<span class="slide-dot"></span>`

            slidesString += `<div class="slide-single bg-white flex flex-col rounded-md">
                                <div class="slide-single-top flex items-center">
                                    <img src="${TESTIMONIALS[i].image}" alt="" class="slide-single-img">
                                    <div class="slide-single-heading">
                                        <p class="slide-single-name">${TESTIMONIALS[i].name}</p>
                                        <p class="slide-single-position">${TESTIMONIALS[i].postition}</p>
                                    </div>
                                </div>
                                <div class="slide-single-bottom">
                                    <p class="slide-single-message">
                                        ${TESTIMONIALS[i].message}
                                    </p>
                                </div>
                            </div>`
        }

        slideContainer.innerHTML = slidesString
        dotsGroup.innerHTML = dotsString
    }

    const render = () => {
        const dots = document.getElementsByClassName("slide-dot");
        const slides = document.getElementsByClassName("slide-single");

        for (let i = 0; i < TESTIMONIALS.length; i++) {
           slides[i].classList.remove("active")
            dots[i].classList.remove("active")
        }
        
        slides[state.index].classList.add("active")
        dots[state.index].classList.add("active")

        const slideWidth = slides[0].offsetWidth
        const transformDistance = (slideWidth * state.index) + (state.index !== 0 ? 20 * state.index : 0)

        slideContainer.style.transform = `translateX(-${transformDistance}px)`
    }

    return {
        init
    }
})()

export default slideHandler