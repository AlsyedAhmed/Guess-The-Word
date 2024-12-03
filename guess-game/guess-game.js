 //setting gome name
let gamename="Guess The Word";
document.title=gamename;
document.querySelector("h1").innerHTML=gamename;
document.querySelector("footer").innerHTML=`${gamename}`;
let messagearea=document.querySelector(".message");


//setting game option

let numberoftries=6;
let numberoflettrs=6;
let currenttry=1;
let numberofHint=2;

//manage words
let wordtoguess="";
const words=["create","update","delete","master","branch","mainly","elzero","school"];
//wordtoguess=words[Math.floor(Math.random()*words.length)];
wordtoguess=words[Math.floor(Math.random()*words.length)];
 




function generateinput(){
    const inputscontainer=document.querySelector(".inputs");
    for(let i=1;i<=numberoftries;i++){
        const trydiv=document.createElement("div");
        trydiv.classList.add(`try${i}`);
        trydiv.innerHTML=`<span> Try${i}</span>`;
        if(i!==1)trydiv.classList.add("disabled-inputs");
        for(let j=1;j<=numberoftries;j++){
            const inputs=document.createElement("input");
            inputs.type="text";
            inputs.id=`guess-${i}-lettr-${j}`;
            inputs.setAttribute("maxlength","1");
            trydiv.appendChild(inputs);
            
        }


        inputscontainer.appendChild(trydiv);

    }
    inputscontainer.children[0].children[1].focus();
    const inputsindisableddiv=document.querySelectorAll(".disabled-inputs input");
    inputsindisableddiv.forEach((input)=>(input.disabled=true));

    const inputs=document.querySelectorAll("input");
    inputs.forEach((input,index)=>{
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            const next_inputs=inputs[index+1];
            if(next_inputs)next_inputs.focus();
           
        });
        input.addEventListener("keydown",function(event){
         const cruntindex=Array.from(inputs).indexOf(this);
         
         if(event.key==="ArrowRight"){
            const nextinput=cruntindex+1;
            if(nextinput<inputs.length)inputs[nextinput].focus();
         }
         if(event.key==="ArrowLeft"){
            const bakeinput=cruntindex-1;
            if(bakeinput>=0)inputs[bakeinput].focus();
         }
        });
       
       
    }); 
}
console.log(wordtoguess);
const guessbutton=document.querySelector(".check");
guessbutton.addEventListener("click",handleguesses);
function handleguesses(){
  let successguess=true;
  for(let i=1;i<=numberoflettrs;i++){
    const inputfiled=document.querySelector(`#guess-${currenttry}-lettr-${i}`);
    const leterrr= inputfiled.value.toLowerCase();
    const actualletter=wordtoguess[i-1];
    //game logic
     if(leterrr===actualletter){
        inputfiled.classList.add("in-place");
     }else if(wordtoguess.includes(leterrr)&&leterrr!=""){

        inputfiled.classList.add("not-in-place")
        successguess=false;
     }
     else{
        inputfiled.classList.add("no");
        successguess=false;
     }
   
 
}
if(successguess){
   messagearea.innerHTML=`you win the word is <span>${wordtoguess}</span>`;
   let alltry=document.querySelectorAll(".inputs >div");
   alltry.forEach((trydiv)=>trydiv.classList.add("disabled-inputs"));
}else{
    document.querySelector(`.try${currenttry}`).classList.add("disabled-inputs");
    const currenttryinputs=document.querySelectorAll(`.try${currenttry} input`);
    currenttryinputs.forEach((input)=>(input.disabled=true));
    currenttry=currenttry+1;
   
  
    const nexttryinputs=document.querySelectorAll(`.try${currenttry} input`);
    nexttryinputs.forEach((input) => (input.disabled = false));
    const el =document.querySelector(`.try${currenttry}`);
    if(el){
        document.querySelector(`.try${currenttry}`).classList.remove("disabled-inputs");
        el.children[1].focus();
    }
    else{
        messagearea.innerHTML=`you lose the word <span>${wordtoguess}</span>`; 
    }
 
}

}

//fountion hint
let hintbutten=document.querySelector(".hint");

document.querySelector(".hint span").innerHTML=numberofHint;
hintbutten.addEventListener("click",hintgame);
function hintgame(){
    if(numberofHint > 0){
        numberofHint--;
        document.querySelector(".hint span").innerHTML=numberofHint;
    }
    if(numberofHint===0){
        hintbutten.disabled = true;
    }
    const enabled=document.querySelectorAll("input:not([disabled])");
    const emptyinput=Array.from(enabled).filter( (input) => input.value ==="");
    console.log(emptyinput);
    if(emptyinput.length > 0){
        const randomindex= Math.floor(Math.random()*emptyinput.length);
        console.log(randomindex);
        const randominput=emptyinput[randomindex];
        console.log(randominput);
        const indextoffill=Array.from(enabled).indexOf(randominput);
        console.log(indextoffill);
        if(indextoffill !== -1){
            randominput.value=wordtoguess[indextoffill].toUpperCase();

        }
    }


}
function handlebakespace(event){
    if(event.key==="Backspace"){
        const inputs=document.querySelectorAll("input:not([disabled])");
        const cruntindex=Array.from(inputs).indexOf(document.activeElement);
       const p=inputs[cruntindex-1]
        if(cruntindex>0){
        const curreninput=inputs[cruntindex];
        const previnput=inputs[cruntindex - 1];
        
        curreninput.value=" ";
        previnput.focus();
        p.focus();
       
       }
    }

}
document.addEventListener("keydown",handlebakespace);




 

window.onload=function(){
    generateinput();
}