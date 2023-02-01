const paymentButtons = document.querySelectorAll(".payment");
const DEVICES = [
  {
    id: "1234567890",
    phone: "123123123",
  },
];

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
const fecharButton = document.querySelector("#fechar");
fecharButton.addEventListener("click", () => {
  document.querySelector(".form-number").classList.remove("disappear");
  document.querySelector(".sucess").classList.add("disappear");

  phoneNumber.value = "";
  paymentButtons[2].classList.remove("active");
  document.querySelector("#phone-container").classList.remove("active");
  document.querySelector("#phone").classList.remove("active");
});
enviarButton.addEventListener("click", () => {
  const registeredDevice = [];
  DEVICES.forEach((device) => {
    if (device.phone === phoneNumber.value) {
      registeredDevice.push(device);
    }
  });

  if (phoneNumber.value.length !== 0) {
    document.querySelector(".form-number").classList.add("disappear");
    document.querySelector(".spinner").classList.remove("disappear");

    setTimeout(() => {
      if (registeredDevice.length === 0) {
        alert(
          "Número de telemóvel não registado. Favor efetuar registo na app."
        );
        paymentButtons[2].classList.remove("active");
        document.querySelector("#phone-container").classList.remove("active");
        document.querySelector("#phone").classList.remove("active");
        document.querySelector(".spinner").classList.add("disappear");
        document.querySelector(".form-number").classList.remove("disappear");
        phoneNumber.value = "";
        return;
      } else {
        document.querySelector(".spinner").classList.add("disappear");
        document.querySelector(".sucess").classList.remove("disappear");
      }
    }, 5000);
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
