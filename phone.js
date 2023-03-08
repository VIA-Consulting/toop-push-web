

var input = document.querySelector("#mobile_code");
var inputInstance = intlTelInput(input, {
	initialCountry: "pt",
    nationalMode:true,
	separateDialCode: true,
    utilsScript:"inputTel/build/js/utils.js",
    separateDialCode:true
});
