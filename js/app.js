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
const ccNumDiv = document.getElementsByClassName("col-6")[0];
const zipDiv = document.getElementsByClassName("col-3")[0];
const cvvDiv = document.getElementsByClassName("col-3")[1];
const cvv = document.getElementById('cvv');
const zip = document.getElementById('zip');
const ccNum = document.getElementById('cc-num');

let price = 0;
let payOption = 'credit-card';
const total = document.createElement("h3");

//ADDING ERROR MESSAGE

//Name error messages
const nameErr = errorMessage("Enter your Name", "nameErr");
fieldset[0].insertBefore(nameErr, name);

//Email error
const emailErr = errorMessage("Enter your Email", "emailErr");
fieldset[0].insertBefore(emailErr, email);

// Card Number error
const ccNumErr = errorMessage("Enter your card number", "ccNumErr");
ccNumDiv.appendChild(ccNumErr);

//Zip code error
const zipErr = errorMessage("Enter your zip", "zipErr");
zipDiv.appendChild(zipErr);

//Cvv error
const cvvErr = errorMessage("Enter your cvv", "cvvErr");
cvvDiv.appendChild(cvvErr);


//Looking for jobe role
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

//Adding t-shirts
design.addEventListener("change", () => {
  const designOption = design.options[design.selectedIndex].value;
  const length = color.children.length;
  let option1;
  let option2;
  let option3;
  for(let i = 0; i < length; i++){
    color.removeChild(color.children[0]);
  }
  if(designOption === "js puns") {
     option1 = createElement("option","Cornflower Blue");
     option1.value = "cornflowerblue";

     option2 = createElement("option","Dark Slate Grey");
     option2.value = "darkslategrey";

     option3 = createElement("option","Gold");
     option3.value = "gold";
  }
   else if(designOption === "heart js") {
       option1 = createElement("option","Tomato");
       option1.value = "tomato";

       option2 = createElement("option","Steel BLue");
       option2.value = "steelblue";

       option3 = createElement("option","Dimgrey");
       option3.value = "dimgrey";
  }
  if( designOption === "select") {
    colorDiv.style.display = "none";
  } else { colorDiv.style.display = "";
    color.appendChild(option1);
    color.appendChild(option2);
    color.appendChild(option3);
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

ccNum.style.borderColor = 'transparent';
zip.style.borderColor = 'transparent';
cvv.style.borderColor = 'transparent';

ccNum.addEventListener("change", e => {
    if (e.target.value.length > 17 || ccNum.value.length < 13 || ccNum.value.match(/^[0-9]+$/) == null) {
        ccNum.style.borderColor = 'red';
    }
    else {
      e.target.style.borderColor ="green";
      ccNumErr.style.display =  "none";
    }
});


zip.addEventListener("change", e => {
    if (zip.value.length !== 5 || zip.value.match(/^[0-9]+$/) == null) {
        zip.style.borderColor = 'red';
    }
    else {
      e.target.style.borderColor ="green";
      zipErr.style.display =  "none";
    }
});


cvv.addEventListener("change", e => {
    if (cvv.value.length !== 3 || cvv.value.match(/^[0-9]+$/) == null) {
        cvv.style.borderColor = 'red';
    }
    else {
      e.target.style.borderColor ="green";
      cvvErr.style.display =  "none";
    }
});

button.addEventListener("click", e => {
  //border is transparent so it updates everytime the button is clicked
  //e.preventDefault();
    name.style.borderColor = 'transparent';
    email.style.borderColor = 'transparent';

    //making names border red to indicate that the you need to fill in a name
    if (name.value == '') {
        name.style.borderColor = 'red';
        nameErr.style.display = "";
        e.preventDefault();
    }

    let sub = "@";
    if (email.value.indexOf(sub) === -1) {
        email.style.borderColor = 'red';
        emailErr.style.display = "";
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

     if (payOption === "credit-card") {
        if (ccNum.value.length > 17 || ccNum.value.length < 13 || ccNum.value.match(/^[0-9]+$/) == null) {
            ccNum.style.borderColor = 'red';
            ccNumErr.style.display = "";
            e.preventDefault();
        }
        if (zip.value.length !== 5 || zip.value.match(/^[0-9]+$/) == null) {
            zip.style.borderColor = 'red';
            zipErr.style.display = "";
            e.preventDefault();
        }
        if (cvv.value.length !== 3 || cvv.value.match(/^[0-9]+$/) == null) {
            cvv.style.borderColor = 'red';
            cvvErr.style.display = "";
              e.preventDefault();
        }

    }
});

function errorMessage(inner, id) {
  const err = createElement("h3", inner);
  err.id = id;
  err.style.color = "red";
  err.style.display = "none";
  return err;
}

function createElement(e ,inner) {
    const element = document.createElement(e);
    element.innerHTML = inner;
    return element;
}

function startFocus() {
  name.focus();
  colorDiv.style.display = "none";
  document.getElementById("paypal").style.display="none";
  document.getElementById("bitcoin").style.display="none";
}

startFocus();
