const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector ("#region");
const formInputs = document.querySelectorAll ("[data-input]");

const closeButton = document.querySelector("#close-message");

//validação do  CEP input//

cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
        const key = String.fromCharCode(e.keyCode);
        
   //permitir somente números//

if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
}
});

// Get address event

cepInput.addEventListener("keyup", (e) => {

        const inputValue = e.target.value

        //checagem da quantidade necessária de dígitos//
        if(inputValue.length === 8){
            getAddress(inputValue);
        }
});

//obter endereço do clinetre via api//

const getAddress = async (cep) => {
   toggleLoader();

   cepInput.blur();

   const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

   const response = await fetch(apiUrl);
  
   const data = await response.json();

   console.log(data);
   console.log(formInputs);
   console.log(data.erro);

//resetar o formulário em caso de erro
if(data.erro === "true"){
    if (!addressInput.hasAttribute("disabled")){
        toggleDisabled();
    }

    addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido por favor tente novamente");
        return;
 }
 // Ativa o atributo desativado se o formulário estiver vazio

    if(addressInput.value === ""){
    toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};

// Adicionar ou remover atributo desabilitado

const toggleDisabled = () => {
    if(regionInput.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });

    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        });
    }
};


//mostrar o loader
const toggleLoader = () => {

    const fadeElement = document.querySelector("#fade");
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");


};

//Mostrar ou não as mensagens 

const toggleMessage = (msg) => {
    const fadeElement =  document.querySelector("#fade");
    const messageElement =  document.querySelector("#message")

    const messageTextElement = document.querySelector("#message p");

    messageTextElement.innertext = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

// Fechando meensagem modal 

closeButton.addEventListener("click", () => toggleMessage());

//Salvar Endereço

addressForm.addEventListener("submit", (e) => {
    e.preventDefault();

    toggleLoader();

    setTimeout(() => {
        toggleLoader();

        toggleMessage("Endereço Salvo com sucesso!");

        addressForm.reset();

        toggleDisabled();
}, 1000);
});

   