const batu_tombol = document.getElementById("batu-p-id");
const kertas_tombol = document.getElementById("kertas-p-id");
const gunting_tombol = document.getElementById("gunting-p-id");
const result = document.querySelector(".result");
const batu_com = document.getElementById("batu-c-id");
const kertas_com = document.getElementById("kertas-c-id");
const gunting_com = document.getElementById("gunting-c-id");

function getComputerSelection() {
    const selections = ['batu-c-id', 'kertas-c-id', 'gunting-c-id'];
    const randomNumber = Math.floor(Math.random() * 3);
    return selections[randomNumber];
}

function win(player, computer) {
    console.log("Player = " + player);
    console.log("Computer = " + computer);
    result.innerHTML = "PLAYER 1 WINS"
    result.style.backgroundColor = '#4C9654';
}

function lose(player, computer) {
    console.log("Player = " + player);
    console.log("Computer = " + computer);
    result.innerHTML = "COM WINS"
    result.style.backgroundColor = '#4C9654';
}

function draw(player, computer) {
    console.log("Player = " + player);
    console.log("Computer = " + computer);
    result.innerHTML = "DRAW"
    result.style.backgroundColor = '#035B0C';
}

function game(playerSelection) {
    const computerSelection = getComputerSelection();
    switch (playerSelection + computerSelection) {
        case "batu-p-idgunting-c-id":
        case "kertas-p-idbatu-c-id":
        case "gunting-p-idkertas-c-id":
            win(playerSelection, computerSelection);
            break;
        case "batu-p-idkertas-c-id":
        case "kertas-p-idgunting-c-id":
        case "gunting-p-idbatu-c-id":
            lose(playerSelection, computerSelection);
            break;
        case "batu-p-idbatu-c-id":
        case "kertas-p-idkertas-c-id":
        case "gunting-p-idgunting-c-id":
            draw(playerSelection, computerSelection);
            break;
    }
}

function main() {
    batu_tombol.addEventListener('click', function() {
        game("batu-p-id");
    })

    kertas_tombol.addEventListener('click', function() {
        game("kertas-p-id");
    })

    gunting_tombol.addEventListener('click', function() {
        game("gunting-p-id");
    })
}

main();