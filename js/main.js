const emojis = ["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓","🍉","🍉","🥝","🥝","🍒","🍒","🍍","🍍"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

function startGame(){

    const game=document.getElementById("game");

    game.innerHTML="";
    matches=0;
    firstCard=null;
    secondCard=null;
    lockBoard=false;

    let cards=[...emojis];
    shuffle(cards);

    cards.forEach(emoji=>{

        const card=document.createElement("div");
        card.className="card";
        card.dataset.emoji=emoji;
        card.innerHTML="?";

        card.addEventListener("click",flipCard);

        game.appendChild(card);
    });

    document.getElementById("status").innerHTML="اعثر على كل الأزواج";
}

function flipCard(){

    if(lockBoard) return;
    if(this===firstCard) return;
    if(this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.innerHTML=this.dataset.emoji;

    if(!firstCard){
        firstCard=this;
        return;
    }

    secondCard=this;

    if(firstCard.dataset.emoji===secondCard.dataset.emoji){

        matches++;

        firstCard=null;
        secondCard=null;

        if(matches===8){
            document.getElementById("status").innerHTML="🏆 مبروك! لقد فزت";
        }

    }else{

        lockBoard=true;

        setTimeout(()=>{

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.innerHTML="?";
            secondCard.innerHTML="?";

            firstCard=null;
            secondCard=null;
            lockBoard=false;

        },1000);
    }
}
if(matches===8){

    document.getElementById("status").innerHTML="🏆 مبروك! لقد فزت";

    document.querySelectorAll(".card").forEach(card=>{
        card.classList.add("win");
    });
}

startGame();