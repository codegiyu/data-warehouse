const navHandler = (() => {
    const menuOpenBtn = document.getElementById("menu-open-btn")
    const menuCloseBtn = document.getElementById("menu-close-btn")
    const menuPane = document.getElementById("menu-pane")
    const menuLinks = document.querySelectorAll(".menu-link-close")

    const state = {
        menuIsOpen: false,
    }

    const init = () => {
        render()
        listeners()
    }

    const listeners = () => {
        menuOpenBtn.addEventListener("click", () => setState({ menuIsOpen: true }))
        menuCloseBtn.addEventListener("click", () => setState({ menuIsOpen: false }))
        
        for (let link of menuLinks) {
            link.addEventListener("click", () => setState({ menuIsOpen: false }))
        }
    }

    const setState = (obj) => {
        state.menuIsOpen = obj.menuIsOpen
        // console.log(state)
        render()
    }

    const render = () => {
        if (state.menuIsOpen) {
            menuPane.classList.add("active")
        } else {
            menuPane.classList.remove("active")
        }
    }

    return {
        init
    }
})()

export default navHandler