// global variable
let music=new Audio("./music/music.mp3");
let winmusic=new Audio("./music/winmusic2.mpeg");
let gameovermusic=new Audio("./music/winmusic.mpeg");
let turnmusic=new Audio("./music/ting.mpeg");
let turn="0";
let isgameover=false;
let iswin=false;

// function to change turn
const changeturn=()=>{
    return turn==="0"?"X":"0";
}

// function to check win
const checkwin=()=>{
    let boxtext=document.getElementsByClassName("boxtext");
    let wins=[
        [0,1,2,0,4,0], // the first three number is the box position on grid, and the 2nd three number is the line position....after win
        [3,4,5,0,11,0],
        [6,7,8,0,18,0],
        [0,3,6,-7,11,90],
        [1,4,7,0,11,90],
        [2,5,8,7,11,90],
        [0,4,8,0,10,225],
        [2,4,6,0,10,135]
    ]
    wins.forEach((e)=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText) && (boxtext[e[2]].innerText===boxtext[e[1]].innerText) && boxtext[e[0]].innerText!==""){
            document.querySelector(".info").innerText=boxtext[e[0]].innerText+" Won the Game";
            isgameover=true;
            iswin=true;
            winmusic.play();
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width="150px";
            document.querySelector(".line").style.width="21vw";
            document.querySelector(".line").style.transform=`translate(${e[3]}vw, ${e[4]}vw)rotate(${e[5]}deg)`;
        }
    })
    //match draw...
    if(iswin!=true){
        if((boxtext[0].innerText!=="") && (boxtext[1].innerText!=="") && (boxtext[2].innerText!=="") && (boxtext[3].innerText!=="") && (boxtext[4].innerText!=="") && (boxtext[5].innerText!=="") && (boxtext[6].innerText!=="") && (boxtext[7].innerText!=="") && (boxtext[8].innerText!=="")){
            isgameover=true;
            gameovermusic.play();
            document.getElementsByClassName("info")[0].innerText="Match Draw";
            document.querySelector(".imgbox").getElementsByTagName("img")[1].style.width="150px";
        }
    }
}



// main game logic
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach((element)=>{
    let boxtext=element.querySelector(".boxtext");
    element.addEventListener("click",()=>{
        turnmusic.play();
        if(boxtext.innerText===""){
            boxtext.innerText=turn;
            turn=changeturn();
            checkwin();
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerText="Turn for "+turn;
            }
        }
    })
})


// add onclick listener to reset button
let reset=document.getElementById("reset");
reset.addEventListener("click",()=>{
    let boxtext=document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach((e)=>{
        e.innerText="";
    });
    isgameover=false;
    iswin=false;
    document.getElementsByClassName("info")[0].innerText="Turn for "+turn;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width="0";
    document.querySelector(".imgbox").getElementsByTagName("img")[1].style.width="0";
    document.querySelector(".line").style.width="0";
})

