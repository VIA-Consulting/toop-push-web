const input = document.querySelector("#mobile_code");
const inputInstance = intlTelInput(input, {
  initialCountry: "pt",
  nationalMode: true,
  separateDialCode: true,
  utilsScript: "inputTel/build/js/utils.js",
  separateDialCode: true
});
const paymentButtons = document.querySelectorAll(".payment");
const DEVICES = [
  {
    id: "device-1234567890",
    phone: "932008993",
  },
];

paymentButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    paymentButtons.forEach((button) => {
      button.classList.remove("active");
    });

    button.classList.add("active");

    if (index === 1) {
      document.querySelector("#phone-container").classList.add("active");
      document.querySelector("#phone").classList.add("active");
      document.querySelector(".form-number").classList.remove("disappear");
      window.scrollTo(0, 0);
    } else {
      document.querySelector("#phone-container").classList.remove("active");
      document.querySelector("#phone").classList.remove("active");
    }
  });
});

const comerciante = document.querySelector("#comerciante").innerHTML;
const total = document.querySelector("#total").innerHTML;
const phoneNumber = document.querySelector("#mobile_code");
const phoneCountry = document.querySelector("#country");
const enviarButton = document.querySelector("#enviar");
const fecharButton = document.querySelectorAll("#fechar");

fecharButton.forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector(".form-number").classList.remove("disappear");
    document.querySelector(".success").classList.add("disappear");
    document.querySelector(".fail").classList.add("disappear");
    document.querySelector(".what-is").classList.add("disappear");

    phoneNumber.value = "";
    paymentButtons[1].classList.remove("active");
    document.querySelector("#phone-container").classList.remove("active");
    document.querySelector("#phone").classList.remove("active");
  })
);

enviarButton.addEventListener("click", () => {
  const registeredDevices = [];
  DEVICES.forEach((device) => {
    if (device.phone === phoneNumber.value) {
      registeredDevices.push(device);
    }
  });

  if (inputInstance.isValidNumber()) {
    document.querySelector(".form-number").classList.add("disappear");
    document.querySelector(".spinner").classList.remove("disappear");
    document.querySelector("#error-telemovel").classList.add("disappear");

    const selectedCountryData = inputInstance.getSelectedCountryData();
    const phoneNumberInput = inputInstance.getNumber();
    const countryCode = "+" + selectedCountryData.dialCode;
    const number = phoneNumberInput.replace(countryCode, "").trim();

    $("#fail-message").text("");
    $.ajax({
      type: "POST",
      url: "http://localhost:8090/portal-api/sendPush",
      data: JSON.stringify({
        data: {
          valor: parseFloat($("#total").text()),
          ddd: parseInt(selectedCountryData.dialCode),
          numero: number,
          merchant: comerciante,
          orderId: $("#order-id").text(),
          pushId: crypto.randomUUID(),
        },
        notificacao: {
          titulo: `Pedido ${$("#order-id").text()} - ${comerciante}`,
          mensagem: `Pagamento de ${total}`,
        },
      }),
      contentType: "application/json; charset=utf-8",
    })
      .done(() => {
        document.querySelector(".spinner").classList.add("disappear");
        document.querySelector(".what-is").classList.add("disappear");
        document.querySelector(".success").classList.remove("disappear");
        phoneNumber.value = "";
      })
      .fail((error) => {
        document.querySelector(".spinner").classList.add("disappear");
        document.querySelector(".fail").classList.remove("disappear");

        if (!error.responseText || error.responseText.length === 0) {
          $("#fail-message").text("N??o foi poss??vel completar o pagamento! Tente novamente mais tarde.");
        }
        else {
          $("#fail-message").text(error.responseText);

        }
        phoneNumber.value = "";
      });
  } else {
    document.querySelector("#error-telemovel").classList.remove("disappear");
  }
});

// Grey background of popup
const phoneContainer = document.querySelector("#phone-container");
phoneContainer.addEventListener("click", () => {
  paymentButtons[1].classList.remove("active");
  document.querySelector("#phone-container").classList.remove("active");
  document.querySelector("#phone").classList.remove("active");
  document.querySelector("#error-telemovel").classList.add("disappear");
  document.querySelector(".what-is").classList.add("disappear");
  document.querySelector(".fail").classList.add("disappear");
});

const menuMobile = document.querySelector("#menu");
menuMobile.addEventListener("click", () => {
  document.querySelector("#nav-ul").classList.toggle("show");
});

const btnWhatIs = document.querySelector("#btn-what-is");
btnWhatIs.addEventListener("click", () => {
  document.querySelector("#phone-container").classList.add("active");
  document.querySelector("#phone").classList.add("active");
  document.querySelector(".form-number").classList.add("disappear");
  document.querySelector(".fail").classList.add("disappear");
  document.querySelector(".success").classList.add("disappear");
  document.querySelector(".what-is").classList.remove("disappear");
  window.scrollTo(0, 0);
});

// sendPushNotification({
//   orderId: $("#order-id").text(),
//   comercianteId: pegar Id no Onboarding,
//   data: {
//     store: comerciante,
//     details (optional): [{name: 'Product 1', size: 'M', quantity: '1', price: '10'}, ...]
//     totalValue: parseFloat(total),
//   },
//   notification: {
//     title: comerciante,
//     message: `Pagamento de ???${total}`,
//   },
//   countryCode: phoneCountry.value,
//   phoneNumber: phoneNumber.value,
// });
