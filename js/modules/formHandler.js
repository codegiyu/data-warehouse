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
        disabled: false
    }

    const init = () => {
        render()
        listeners()
    }

    const setState = (obj) => {
        let disabled = !helpers.allFieldsAreErrorFree(obj.errors)

        state.errors = obj.errors
        state.disabled = disabled

        render()
    }

    const listeners = () => {
        form.addEventListener("submit", function(e) {
            e.preventDefault()

            let dataPackage = {
                id: idField.value,
                itemName: nameField.value,
                itemPrice: priceField.value
            }
            console.log(dataPackage)
            dataBank.setState(dataPackage)

            setTimeout(() => {
                form.reset()
            }, 500)
        })

        idField.addEventListener("input", function(e) {
            let name = e.target.name, value = e.target.value

            try {
                for (let entry of dataBank.state.data) {
                    if (entry.id === value) {
                        throw new Error(`The id ${value} already exists`)
                    }
                }

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
        
        btn.disabled = state.disabled
    }

    return {
        init
    }
})()

export default formHandler