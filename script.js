const paymentButtons = document.querySelectorAll(".payment");

paymentButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    paymentButtons.forEach((button) => {
      button.classList.remove("active");
    });

    button.classList.add("active");

    if (index === 2) {
      document.querySelector("#phone").classList.add("active");
    } else {
      document.querySelector("#phone").classList.remove("active");
    }
  });
});

const comerciante = document.querySelector("#comerciante").innerHTML;
const total = document.querySelector("#total").innerHTML;
const phoneNumber = document.querySelector("#number");
const submitButton = document.querySelector("#submit");
submitButton.parentNode.style.display = "flex";
submitButton.parentNode.style.justifyContent = "center";
submitButton.addEventListener("click", () => {
  if (phoneNumber.value.length !== 0) {
    alert(
      `Comerciante: ${comerciante}\nTelemóvel: ${
        phoneNumber.value
      }\nTotal: €${+total}`
    );
    phoneNumber.value = "";
    paymentButtons[2].classList.remove("active");
    document.querySelector("#phone").classList.remove("active");
  }
});
