const paymentButtons = document.querySelectorAll(".payment");

paymentButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    paymentButtons.forEach((button) => {
      button.classList.remove("active");
    });

    button.classList.add("active");

    if (index === 2 && !document.querySelector("#phone")) {
      const form = document.createElement("form");
      form.setAttribute("id", "form");
      const label = document.createElement("label");
      label.innerText = "Telemóvel: ";

      const input = document.createElement("input");
      input.setAttribute("id", "phone");
      input.setAttribute("type", "number");

      form.appendChild(label);
      form.appendChild(input);
      label.parentNode.style.textAlign = "center";

      button.parentNode.appendChild(form);
    } else if (index !== 2 && document.querySelector("#phone")) {
      document.querySelector("#phone").parentNode.remove();
    }
  });
});
