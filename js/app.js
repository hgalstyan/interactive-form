const colorDiv = document.getElementById("colors-js-puns");
const fieldset = document.getElementsByTagName("fieldset");
const payment = document.getElementById("payment");
const activities = document.getElementsByClassName("activities")[0];
const name = document.getElementById("name");
const email = document.getElementById("mail");
const jobField = document.getElementById("title");
const design = document.getElementById("design");
const color = document.getElementById("color");
const payMethod = document.getElementsByClassName("pay");
const button = document.getElementsByTagName("button")[0];
const jsFrameworks = document.querySelector("input[name = 'js-frameworks']");
const jsLibs = document.querySelector("input[name = 'js-libs']");
const express = document.querySelector("input[name = 'express']");
const node = document.querySelector("input[name = 'node']");

console.log(email, name);

let price = 0;
let payOption = 'credit-card';
const total = document.createElement("h3");

jobField.addEventListener("click",() => {
  const option = jobField.options[jobField.selectedIndex].value;
  if(option === "other" && !document.getElementById("other-title")){
    const other = document.createElement("input");
    other.type = "text";
    other.id = "other-title";
    other.name = "job-role";
    other.placeholder = "Your Job Role";
    fieldset[0].appendChild(other);
  }
});

design.addEventListener("change", () => {
  const designOption = design.options[design.selectedIndex].value;
  const colorOptions = color.options;
  if(designOption !== "Select Theme") {
    colorDiv.style.display = "";
    for(let i = 0; i < colorOptions.length; i++) {
      (designOption === colorOptions[i].className)? colorOptions[i].style.display = "" : colorOptions[i].style.display = "none";
    }
  } else {
    colorDiv.style.display = "none";
  }
});

activities.addEventListener("change", e => {
  switch (e.target.name) {
    case "js-frameworks":
      (e.target.checked)? express.disabled = true : express.disabled = false;
      break;
    case "express":
      (e.target.checked)? jsFrameworks.disabled = true : jsFrameworks.disabled = false;
      break;
    case "js-libs":
      (e.target.checked)? node.disabled = true : node.disabled = false;
      break;
    case "node":
      (e.target.checked)? jsLibs.disabled = true : jsLibs.disabled = false;
      break;
  }

  const cur = parseInt(e.target.attributes[2].value);
  (e.target.checked) ? price += cur : price -= cur;
  if(price !== 0) total.innerHTML = `Total: $${price}`
   else total.innerHTML = `You haven't choose any activities. Please select one.`;
   total.style.color = "black";
  activities.appendChild(total);
});

payment.addEventListener("change", e => {
  payOption = e.target.options[e.target.selectedIndex].value;

  Array.prototype.forEach.call(payMethod, option => {
    (option.id === payOption)? option.style.display = "": option.style.display = "none";
  });
});

button.addEventListener("click", e => {
  //border is transparent so it updates everytime the button is clicked
  //e.preventDefault();
    name.style.borderColor = 'transparent';
    email.style.borderColor = 'transparent';

    //making names border red to indicate that the you need to fill in a name
    if (name.value == '') {
        name.style.borderColor = 'red';
        e.preventDefault();
    }

    let sub = "@";
    if (email.value.indexOf(sub) === -1) {
        email.style.borderColor = 'red';
        email.a
        e.preventDefault();
    }

    //if price is less then 100 means that none of the checkboxes is checked wich means that i need to correct them
    if (price < 100) {
        total.innerHTML = 'You need to select one activity';
        total.style.color = 'red';
        //decided to make this a message instead of a border because it looks nicer
        activities.appendChild(total);
        e.preventDefault();
        //i use prevent default on every if statement so the submit button dosent actully submit and instead makes the statements that i say it should
    }

    if (payOption === "select_method") {
      const payError = document.createElement("h3");
      payError.innerHTML = "You need to select one payment method";
      payError.style.color = "red";
      fieldset[fieldset.length-1].appendChild(payError);
      e.preventDefault();
    }
    else if (payOption === "credit-card") {
      const cvv = document.getElementById('cvv');
      const zip = document.getElementById('zip');
      const ccNum = document.getElementById('cc-num');

      ccNum.style.borderColor = 'transparent';
        zip.style.borderColor = 'transparent';
        cvv.style.borderColor = 'transparent';

        if (ccNum.value.length > 17 || ccNum.value.length < 13 || ccNum.value.match(/^[0-9]+$/) == null) {
            ccNum.style.borderColor = 'red';
            event.preventDefault();
        }
        if (zip.value.length !== 5 || zip.value.match(/^[0-9]+$/) == null) {
            zip.style.borderColor = 'red';
            event.preventDefault();
        }
        if (cvv.value.length !== 3 || cvv.value.match(/^[0-9]+$/) == null) {
            cvv.style.borderColor = 'red';
            event.preventDefault();
        }
    }
});


function startFocus() {
  name.focus();
  colorDiv.style.display = "none";
  document.getElementById("paypal").style.display="none";
  document.getElementById("bitcoin").style.display="none";
}

startFocus();
