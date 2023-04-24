import formHandler from "./formHandler.js";

const dataBank = (() => {
    const tableBody = document.querySelector(".table-body")
    
    const initialState = localStorage.dataStorage ? JSON.parse(localStorage.dataStorage) : []
    
    const state = {
        data: initialState
    }

    const init = () => {
        render()
    }

    const setState = (obj) => {
        state.data.push(obj)
        localStorage.setItem("dataStorage", JSON.stringify(state.data))
        formHandler.setState({ ...formHandler.state, nextID: Number( obj.id) + 1 })
        render()
    }

    const render = () => {
        tableBody.innerHTML = ""

        state.data.forEach((item, idx) => {
            tableBody.innerHTML += `<tr className="table-body-row">
                                        <td >
                                            <p className="">${item.id}</p>
                                        </td>
                                        <td >
                                            <p >${item.itemName}</p>
                                        </td>
                                        <td >
                                            <p >${item.itemPrice}</p>
                                        </td>
                                    </tr>`
        })
    }

    return {
        init,
        state,
        setState
    }
})()

export default dataBank