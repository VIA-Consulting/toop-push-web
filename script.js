const paymentButtons = document.querySelectorAll(".payment");

paymentButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    paymentButtons.forEach((button) => {
      button.classList.remove("active");
    });

    button.classList.add("active");

    if (index === 2) {
      document.querySelector("#phone-container").classList.add("active");
      document.querySelector("#phone").classList.add("active");
    } else {
      document.querySelector("#phone-container").classList.remove("active");
      document.querySelector("#phone").classList.remove("active");
    }
  });
});

const comerciante = document.querySelector("#comerciante").innerHTML;
const total = document.querySelector("#total").innerHTML;
const phoneNumber = document.querySelector("#number");
const enviarButton = document.querySelector("#enviar");
enviarButton.addEventListener("click", () => {
  if (phoneNumber.value.length !== 0) {
    alert(
      `Comerciante: ${comerciante}\nTelemóvel: ${
        phoneNumber.value
      }\nTotal: €${+total}`
    );
    phoneNumber.value = "";
    paymentButtons[2].classList.remove("active");
    document.querySelector("#phone-container").classList.remove("active");
    document.querySelector("#phone").classList.remove("active");
  } else {
    alert("Por favor insira um número de telemóvel");
  }
});

const phoneContainer = document.querySelector("#phone-container");
phoneContainer.addEventListener("click", () => {
  paymentButtons[2].classList.remove("active");
  document.querySelector("#phone-container").classList.remove("active");
  document.querySelector("#phone").classList.remove("active");
});

//Menu Mobile 
const menu = document.querySelector("#menu");
menu.addEventListener("click", () => {
  document.querySelector("#nav-ul").classList.toggle("show");
  
});
