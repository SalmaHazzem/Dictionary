let input =document.getElementById("search");
let searchBtn =document.getElementById("searchBtn");
let wordHead=document.querySelector(".result")
let soundText=document.querySelector(".small")
let noun=document.querySelector(".nounResult")
let verb=document.querySelector(".verb")
let select=document.querySelector("select")
let currentValue=input.value;
let prevValue='';
let arrOfLi=[]
function checkForInput(input){
    currentValue=input.value;
   return input.value==' '||input.value.length==0?false:true;
}

function addError(){
    input.style.border='1px red solid';
}


function removeError(){
     input.style.border='none';
}

function btnDisable(btn){
    btn.setAttribute('disabled',true)
}


function btnEnable(btn){
    btn.removeAttribute('disabled')
}

function compareValues(prev,current){
    return prev===current?true:false;
}

input.addEventListener('change',function(){
    btnEnable(searchBtn);
})

function clearPrevResult(arrOfLi){
    for(let i=0;i<arrOfLi.length;i++){
        arrOfLi[i].remove()
    }

}

async function getData(){
   clearPrevResult(arrOfLi)
    removeError()
    if(compareValues(prevValue,currentValue)){
        btnDisable(searchBtn)
    }else{
       
        const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
        const finalResponse= await response.json()
        if(finalResponse['title']==='No Definitions Found'){
            wordHead.innerHTML=finalResponse['title'];

        }else {
            console.log(finalResponse)
            wordHead.innerHTML=finalResponse[0]['word'];
            finalResponse[0]['phonetics'].map(e=>{
                soundText.innerHTML=e['text']
                document.querySelector(".audio").setAttribute('src',e['audio'])      
            })
         
           finalResponse[0]['meanings'].map((e)=>{
            if(e['partOfSpeech']==='noun'){
                e['definitions'].forEach(item => {
                    let li=document.createElement('li');
                    li.innerHTML=item['definition'];
                    noun.appendChild(li);
                    arrOfLi.push(li)
                });
                document.querySelector(".info").innerHTML=e['synonyms'][0]
            } if(e['partOfSpeech']==='verb'){
                e['definitions'].forEach(item => {
                    let li=document.createElement('li');
                    li.innerHTML=item['definition'];
                    verb.appendChild(li);
                    arrOfLi.push(li)
                });
    
            }
            console.log(arrOfLi)
            // document.querySelector(".audio").setAttribute('src',finalResponse[0]['phonetics'][2]['audio'])      
            document.querySelector(".link").setAttribute('href',finalResponse[0]['sourceUrls'][0])      
            document.querySelector(".link").innerHTML=finalResponse[0]['sourceUrls'][0]      
        })
            prevValue=currentValue
        }
       
    }
}

function searchWord(){
   return checkForInput(input)?getData():addError();
}

searchBtn.addEventListener("click",function(){
    searchWord()
})


select.addEventListener("change",function(){
document.body.style.fontFamily=select.value;
})