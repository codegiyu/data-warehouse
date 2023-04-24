import dataBank from "./dataStorage.js";
import helpers from "../helpers/index.js";

const formHandler = (() => {
    const idField = document.getElementById("id-field")
    const nameField = document.getElementById("item-name-field")
    const priceField = document.getElementById("item-price-field")
    const formFields = [idField, nameField, priceField]
    const btn = document.getElementsByClassName("form-submit")[0]
    const form = document.getElementsByClassName("data-form")[0]
    const idError = document.querySelector(".id-error")
    const nameError = document.querySelector(".name-error")
    const priceError = document.querySelector(".price-error")

    const state = {
        errors: { id: "", name: "", price: ""},
        disabled: false,
        nextID: 0
    }

    const init = () => {
        calculateNextID()
        render()
        listeners()
    }

    const setState = (obj) => {
        let disabled = !helpers.allFieldsAreErrorFree(obj.errors)

        state.errors = obj.errors
        state.disabled = disabled
        state.nextID = obj.nextID

        render()
    }

    const calculateNextID = () => {
        setState({ ...state, nextID: (Math.max(...dataBank.state.data.map(entry => Number(entry.id))) || 0) + 1 })
    }

    const listeners = () => {
        form.addEventListener("submit", function(e) {
            e.preventDefault()

            let dataPackage = {
                id: idField.value.match(/\d+/g)[0],
                itemName: nameField.value,
                itemPrice: priceField.value
            }
            console.log(dataPackage)
            dataBank.setState(dataPackage)

            setTimeout(() => {
                form.reset()
            }, 500)
        })

        nameField.addEventListener("input", function(e) {
            let name = e.target.name, value = e.target.value

            try {
                setState({ ...state, errors: { ...state.errors, [name]: "" } })
            } catch (error) {
                setState({ ...state, errors: { ...state.errors, [name]: error.message } })
            }
        })

        nameField.addEventListener("change", function(e) {
            let name = e.target.name, value = e.target.value

            try {
                if (!/^[\w- ]+$/i.test(value)) {
                    throw new Error("Invalid character in name")
                }

                setState({ ...state, errors: { ...state.errors, [name]: "" } })
            } catch (error) {
                setState({ ...state, errors: { ...state.errors, [name]: error.message } })
            }
        })
    }

    const render = () => {
        idError.textContent = state.errors.id
        nameError.textContent = state.errors.name
        priceError.textContent = state.errors.price

        idField.setAttribute("value", `ID: ${state.nextID}`)
        console.log(idField.value)
        btn.disabled = state.disabled
    }

    return {
        init,
        state,
        setState
    }
})()

export default formHandler