//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function validateInput(username,password){
      if(!username || !password){
        throw "Input not provided";
      }
      if(typeof username!=='string' || typeof password!=='string'){
        throw "Input must be string";
      }
      if(username.trim().length==0 || password.trim().length==0){
        throw "Input cannot be Empty spaces";
      }
      if(!((/^[a-zA-Z0-9]{4,}$/).test(username.trim()))){
        throw "Username can only contain alphanumeric characters(no spaces) and should be at least 4 characters long";
      }
      if(!((/^(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.* ).{6,}$/).test(password))){
        throw "Password should have at least one uppercase character, at least one number, at least one special character and at least 6 characters long";
      }
}

module.exports={
    validateInput
}