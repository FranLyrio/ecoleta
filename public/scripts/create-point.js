function populateUF() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for(state of states) {
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUF();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    
    // const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[event.target.selectedIndex].text
    
    const url = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);
//

//Itens de coleta

// todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

// pegar o valor do input vazio no html, para colocar os valores que serão atualizados na última linha da função
const collectedItems = document.querySelector("input[name=items]")

// array vazio, pois começa com nenhum dos items selecionados
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id // recebe o valor id que foi selecionado pelo usuário

    console.log('ITEM ID:', itemId)

    //verificar se existem items selecionados se sim, 
    // pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => { return item == itemId})
    
    // se sim, tirar da seleção
    if (alreadySelected  >= 0) {
        const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId 
        return itemIsDifferent
    // nesse caso, PRECISA ser uma condição de negação, pois quando ele retornar falso (um NÃO é diferente do outro), a função tira do novo Array
    // se retornar verdadeiro, então o item será adicionado ao Array
        })
        selectedItems = filteredItems;
    } else {
        // se não tiver selecionado, adicionar à seleção!
        selectedItems.push(itemId)
    }
    
}

// atualizar o campo escondido com os items selecionados
collectedItems.value = selectedItems

for(item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

