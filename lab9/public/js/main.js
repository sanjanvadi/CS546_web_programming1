/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

// let imgbuf=[];
// const fileInput = document.getElementById("fileInput");
// const image = document.getElementById('image');
// fileInput.addEventListener("change", async (e) => {
//     imgbuf=await images(e);
//     // console.log(imgbuf);
//     image.value=imgbuf.toString();
//     console.log(image.value);
//     // fileInput.value=imgbuf;
//     // console.log(fileInput.value);
// });


// const images = async(e)=>{
//     const imagebuf=[];
//     for(let i=0;i<e.target.files.length;i++){
//         const reader = new FileReader();
//         reader.readAsDataURL(e.target.files[i]);
//         reader.addEventListener("load", () => {
//         imagebuf.push(reader.result);
//         });
//     };
//     return imagebuf;
// }

let myForm = document.getElementById('myForm');
let textInput = document.getElementById('text_input');
let errorDiv = document.getElementById('error');
let errorP = document.getElementById('errorP');
let myUl = document.getElementById('results');
let frmLabel = document.getElementById('formLabel');
let sort = document.getElementById('sorted');
if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try{
        let value=textInput.value.trim();
        validateInput(value);
        errorDiv.hidden = true;
        value = value.replace(/,\s*$/, "");
        value = JSON.parse("[" + value + "]");
        let fullNum = [];
        for(i=0;i<value.length;i++){
            for(j=0;j<value[i].length;j++){
                fullNum.push(value[i][j])
            }
        }
        console.log(value);
        console.log(fullNum);
        let sorted = fullNum.sort(function(a, b){return a - b});
        let myUlCount = document.getElementById('results').childElementCount;
        if(myUlCount%2==0){
            let li = document.createElement('li');
            li.innerHTML = "["+sorted+"]";
            li.className = 'is-green';
            li.namespaceURI
            myUl.appendChild(li);
        }else{
            let li = document.createElement('li');
            li.innerHTML = "["+sorted+"]";
            li.className = 'is-red';
            myUl.appendChild(li);
        }
        myForm.reset();
        textInput.focus();
    }catch(e){
        textInput.value = '';
        errorDiv.hidden = false;
        errorP.innerHTML=e;
        textInput.focus();
    }
    });
}

function validateInput(input){
    if(!input){
        throw "Error : NO input entered";
    }
    if(input.toString().includes("-0")){
        throw "Error : Input is not a valid number";
    }
    input = input.replace(/,\s*$/, "");
    try {
        input = JSON.parse("[" + input + "]");
    } catch (error) {
        throw "Error : Invalid Input";
    }
    if(((/\./g).test(input.toString()))){
        throw "Error : Decimal input not allowed";
    }
    for(i=0;i<input.length;i++){
        if(input[i].length==0){
            throw "Error : Each array should have at least one element";
        }
        if(!(Array.isArray(input[i]))){
            throw "Error : not an array input";
        }
        for(j=0;j<input[i].length;j++){
            if(typeof input[i][j]!=='number'){
                throw "Error : Each array element should be a number";
            }
        }
        
    }
};