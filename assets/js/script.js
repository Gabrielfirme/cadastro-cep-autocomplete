const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector ("#region");
const formInputs = document.querySelectorAll ("[data-input]");
const closeButton = document.querySelector("#close-message");



cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
        const key = String.fromCharCode(e.keyCode);
        
   

if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
}
});



cepInput.addEventListener("keyup", (e) => {

        const inputValue = e.target.value

        
        if(inputValue.length === 8){
            getAddress(inputValue);
        }
});



const getAddress = async (cep) => {
   toggleLoader();

   cepInput.blur();

   const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

   const response = await fetch(apiUrl);
  
   const data = await response.json();

   console.log(data);
   console.log(formInputs);
   console.log(data.erro);


if(data.erro === "true"){
    if (!addressInput.hasAttribute("disabled")){
        toggleDisabled();
    }

    addressForm.reset();
        toggleLoader();
        toggleMensagem("CEP inválido por favor tente novamente");
        return;
 }
 

    if(addressInput.value === ""){
    toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader();
};



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



const toggleLoader = () => {

    const fadeElement = document.querySelector("#fade");
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");


};



const toggleMensagem = (msg) => {
    const fadeElement =  document.querySelector("#fade");
    const mensagemElement =  document.querySelector("#mensagem")

    const mensagemTextElement = document.querySelector("#mensagem p");

    mensagemTextElement.innertext = msg;

    fadeElement.classList.toggle("hide");
    mensagemElement.classList.toggle("hide");
};



closeButton.addEventListener("click", () => toggleMensagem());



addressForm.addEventListener("submit", (e) => {
    e.preventDefault();

    toggleLoader();

    setTimeout(() => {
        toggleLoader();

        toggleMensagem("Endereço Salvo com sucesso!");

        addressForm.reset();

        toggleDisabled();
}, 1000);
});

   