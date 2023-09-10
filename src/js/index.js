const formEl = document.querySelector('form');
const emailFld = document.querySelector("input[name='email']");
const passwordFld = document.querySelector("input[name='password']");
const repasswordFld = document.querySelector("input[name='repassword']");
const fullnameFld = document.querySelector("input[name='fullname']");
const merchantFld = document.querySelector("input[name='merchant']");
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

let canSubmit = true; // lastely changed to true after the form is filled

//step 3:
const submitForm = (data) => {
    console.log(data)
}
//function for validation
const validationCheck = function(el, condition) {
  if (condition) {
    canSubmit= true;
    el.parentElement.classList.remove('form-field-error');
  } else {
    canSubmit = false;
    el.parentElement.classList.add('form-field-error');
  }
}

//Now individual form validators 
emailFld.addEventListener('keyup', function (evt) {
    evt.preventDefault();
    /*if (evt.target.reportValidity()) { //this built in method uses the form's fieild type and returns the boolean if it matches or not 
      canSubmit = true;
      this.parentElement.classList.remove('form-field-error')
    } else {
      canSubmit = false;
      this.parentElement.classList.add('form-field-error')
      } */     // this.parentElement hepls us to jump one step like level up to form field , as we have added the event listener to the input field..
    validationCheck(this,evt.target.reportValidity());  
});

passwordFld.addEventListener('keyup', function (evt) {
    evt.preventDefault();
    validationCheck(this,passwordRegEx.test(evt.target.value));  
});

repasswordFld.addEventListener('keyup', function (evt) {
    evt.preventDefault();
    validationCheck(this, passwordFld.value === evt.target.value);  
});

fullnameFld.addEventListener('keyup', function (evt) {
    evt.preventDefault();
    evt.target.value = evt.target.value.trimLeft();
    validationCheck(this, evt.target.reportValidity());
})



//step 1 
formEl.addEventListener('submit', function (evt) {
    evt.preventDefault();  //removes all browser functionalities
    /*console.log(evt.target.elements['email'].value);*/ //targets each elements for example email
    
    //conversion of all data to object so it can be sent properly and even it is converted to array..
    const getFormValues = [...evt.target.elements].filter((el) => el.type !== 'submit' && el ).map((el) => { //filter submit button becoz we dont need it 
        return {                         //map is use to get all the values here using the 'name attributcheckbox is checked with the help of el.checked property
            name: el.getAttribute('name'),
            type: el.type,
            value: el.type === 'checkbox' ? el.checked : el.value,

        };
    });
    //step 2:
   //now to chk the form is filled fully , need to chk the input boxes..."chkbox is optional here so eliminate it..."
   // filter method excluding chkox and every mthod for cheaking if values are not empty...
   const isFilled = getFormValues
   .filter((el)=> el.type !== 'checkbox')
   .every((el)=> el.value !== '');

     //to chk if isFilled is true and canSumbit is true , invoke a function name submitForm 
     isFilled && canSubmit && submitForm(getFormValues);
});