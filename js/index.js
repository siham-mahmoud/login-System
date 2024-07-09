//inputs 
var loginEmail=document.getElementById("loginEmail");
var loginPassword=document.getElementById("loginPassword");
var signupName=document.getElementById("signupName");
var signupEmail=document.getElementById("signupEmail");
var signupPassword=document.getElementById("signupPassword")
    


var baseURL = window.location.origin + '/login-System';
console.log(baseURL);
// to say welcome in home page



// store signUp info
var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}
console.log(localStorage.getItem('users'));
 //check if inputs empty or not 
 function isEmpty(){
    if (signupEmail.value==""||signupName.value==""|| signupPassword.value== ""){
        return false;

    }
    else{
        return true;
    }
 }
 // /check if email exist in array of signup with signup input
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            console.log("false");
            return false
            
        }
    }
}



function SignUp(){
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (isEmpty() == false) {
        document.getElementById('alert').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
     
        return false
    }
    if (isEmailExist() == false) {
        document.getElementById('alert').innerHTML = '<span class="text-danger m-3">email already exists</span>'
        return false
    }
    if (!usernamRegex.test(signupName.value) || !emailRegex.test(signupEmail.value) || !passwordRegex.test(signupPassword.value)) {
        document.getElementById('alert').innerHTML = '<span class="text-danger m-3">Please correct the highlighted errors</span>';
       
    }
    // to store all value as object
  
    //check if email exist in array of signup

    else {
        signUpArray.push(signUp)
     
        localStorage.setItem('users', JSON.stringify(signUpArray))
    
        document.getElementById('alert').innerHTML = '<span class="text-success m-3">Success</span>'
    
         
            location.replace(baseURL + '/index.html')
       
    


   
  

    }

}
//check inputs for user if empty
function loginIsEmpty(){
    if (loginEmail.value== ""||loginPassword.value== ""){
        return false;
    }

    else{
        return true;
    }
}
function LogIn(){
    if (loginIsEmpty()==false){
        document.getElementById('msg').innerHTML= '<span class="text-danger m-4">All inputs is required</span>'
    }
    var password = loginPassword.value
    var email = loginEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
       
                location.replace(baseURL + '/home.html')
            

            
        } 
        else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
          
        }
    }
}



var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}
function logout() {
    localStorage.removeItem('sessionUsername')
}






// validate signup information for user 

    usernamRegex =/^.{3,16}$/;
emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
passwordRegex=/^.{5,}$/;
signupName.addEventListener("input", function () {
    validate(signupName, usernamRegex);
  });
  
  signupEmail.addEventListener("input", function () {
    validate(signupEmail, emailRegex);
  });
  signupPassword.addEventListener("input", function () {
    validate(signupPassword, passwordRegex);
  });

function validate(e,regex){
    if (regex.test(e.value)){
        e.classList.add("is-valid");
        e.classList.remove("is-invalid")
      }
      else{
        e.classList.add("is-invalid");
        e.classList.remove("is-valid")
      }

    }


