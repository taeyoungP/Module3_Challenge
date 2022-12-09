//Shuffle function
//function algorithm brought from https://stackoverflow.com/questions/3079385/str-shuffle-equivalent-in-javascript
function shuffle(string) { //Shuffle
  var char = string.split('');
  for (var i = char.length; i > 0;) {
      var random = parseInt(Math.random() * i);
      var temp = char[--i];
      char[i] = char[random];
      char[random] = temp;
  }
  return char.join('');
}

//Password Object
var password = {
  lowerChar: ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'],
  upperChar: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  num: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  specialChar: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'],
  allChar: [],
  result: "",
  resultLength: function () {
    return this.result.length;
  }

}

function passwordLength(lengthPassword) { //Check if user input is numeric value and has proper length
  if(lengthPassword === null){ //canceled
    return 1;
  }
  if(!(isFinite(lengthPassword))){ //check if input is not numeric value
    alert("Please input proper length!");
    return 1;
  }
  if((lengthPassword < 8) || (lengthPassword > 128)){ //check if input has proper length
    alert("Invalid length. (Length should be at least 8 characters and no more than 128 characters)")
    return 1;
  }
  return 0;
}

function generatePassword() {
  var lengthPassword = prompt("Enter the length of the password. (At least 8 characters and no more than 128 characters)"); //user input

  if(passwordLength(lengthPassword) == 1){ //passwordLength() to check if the input length of password is valid or not
    return "";
  }

  //gathering criterias for password
  var lowercaseTrue = confirm("Include lowercase?");
  var uppercaseTrue = confirm("Include uppercase?");
  var numericTrue = confirm("Include numeric?");
  var specialTrue = confirm("Include Special?");

  if((lowercaseTrue || uppercaseTrue || numericTrue || specialTrue) === false){ //return default result (empty) if there is no selected criteria
    alert("No selected criteria: Cannot generate password");
    return password.result;
  } 

  //Now generate password based on selected criteria//

  password.result = ""; //Make sure to clear result and allChar array before generating new password
  password.allChar = [];

  //Make sure to include at least one selected criteria in password
  if(lowercaseTrue){
    password.result = password.result + (password.lowerChar[Math.floor(Math.random() * password.lowerChar.length)]);
    password.allChar = password.allChar.concat(password.lowerChar);
  }
  if(uppercaseTrue){
    password.result = password.result + (password.upperChar[Math.floor(Math.random() * password.upperChar.length)]);
    password.allChar = password.allChar.concat(password.upperChar);
  }
  if(numericTrue){
    password.result = password.result + (password.num[Math.floor(Math.random() * password.num.length)]);
    password.allChar = password.allChar.concat(password.num);
  }
  if(specialTrue){
    password.result = password.result + (password.specialChar[Math.floor(Math.random() * password.specialChar.length)]);
    password.allChar = password.allChar.concat(password.specialChar);
  }

  while(password.resultLength() < lengthPassword){ //add rest of the characters randomly until password reaches to desired length
    password.result = password.result + (password.allChar[Math.floor(Math.random() * password.allChar.length)]);
  }
  console.log(password.result);
  //Finally, randomly shffule password
  password.result = shuffle(password.result);
  
  console.log(password.result);

  return password.result;
  
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
