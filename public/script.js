function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")
    
    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value) {

        const checkIfString = typeof event.target[value].value === "string" // === é exatamente igual
        const checkIfIsEmpty = !event.target["title"].value.trim()

        if(checkIfString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault()   //não fazer o evento de enviar
        alert("Por favor, preencha todos os campos")
    }

}