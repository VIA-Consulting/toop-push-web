const paymentButtons = document.querySelectorAll(".payment");
const DEVICES = [
  {
    id: "device-1234567890",
    phone: "123123123",
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
const phoneNumber = document.querySelector("#number");
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
  console.log(phoneNumber.value);
  DEVICES.forEach((device) => {
    if (device.phone === phoneNumber.value) {
      registeredDevices.push(device);
    }
  });

  if (phoneNumber.value.length !== 0) {
    document.querySelector(".form-number").classList.add("disappear");
    document.querySelector(".spinner").classList.remove("disappear");
    document.querySelector("#error-telemovel").classList.add("disappear");
    console.log("teste");

    // $.ajax({
    //   type: "POST",
    //   url: "http://localhost:8090/portal-api/sendPush",
    //   data: JSON.stringify({
    //     data: {
    //       valor: parseFloat($("#total").text()),
    //       ddd: parseInt($("#country").val()),
    //       numero:phoneNumber.value
    //     },
    //     notificacao: {
    //       titulo: "Teste 3",
    //       mensagem: "Teste 3",
    //     },
    //   }),
    //   contentType: "application/json; charset=utf-8",
    // }).done(() => {
    //   document.querySelector(".spinner").classList.add("disappear");
    //   document.querySelector(".what-is").classList.add("disappear");
    //   document.querySelector(".success").classList.remove("disappear");
    //   phoneNumber.value = "";
    // }).fail(() => {
    //   document.querySelector(".spinner").classList.add("disappear");
    //   document.querySelector(".fail").classList.remove("disappear");
    //   phoneNumber.value = "";
    // });

    setTimeout(() => {
      if (registeredDevices.length === 0) {
        document.querySelector(".spinner").classList.add("disappear");
        document.querySelector(".fail").classList.remove("disappear");
        phoneNumber.value = "";
        return;
      }

      document.querySelector(".spinner").classList.add("disappear");
      document.querySelector(".what-is").classList.add("disappear");
      document.querySelector(".success").classList.remove("disappear");
      phoneNumber.value = "";
    }, 5000);
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
//     message: `Pagamento de €${total}`,
//   },
//   countryCode: phoneCountry.value,
//   phoneNumber: phoneNumber.value,
// });
