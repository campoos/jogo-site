"use strict"

function alerta() {
    alert("você NÃO veio para isso, venha me enfrentar");
}

let mainBackup;
let batalhaFinalizada = false;
let virusInterval;

function batalha() {
    const main = document.getElementById("main");

    if (!mainBackup) {
        mainBackup = main.innerHTML;
    }

    main.innerHTML = "";

    const battleDiv = document.createElement("div");
    battleDiv.id = "batalha";
    battleDiv.style.position = "fixed";
    battleDiv.style.top = "0";
    battleDiv.style.left = "0";
    battleDiv.style.width = "100vw";
    battleDiv.style.height = "100vh";
    battleDiv.style.background = "black";
    battleDiv.style.color = "white";
    battleDiv.style.display = "flex";
    battleDiv.style.flexDirection = "column";
    battleDiv.style.alignItems = "center";
    battleDiv.style.justifyContent = "center";
    battleDiv.style.textAlign = "center";

    function tocarMusicaVitoria() {
        const audio = document.createElement("audio");
        audio.src = "./img/vitoria.mp3"; // use um caminho válido para seu arquivo de áudio
        audio.autoplay = true;
        document.body.appendChild(audio);
    
        setTimeout(() => {
            audio.remove();
        }, 5000);
    }

    function tocarMusicaDerrota() {
        const audio = document.createElement("audio");
        audio.src = "./img/derrota.mp3";
        audio.autoplay = true;
        document.body.appendChild(audio);
    
        setTimeout(() => {
            audio.remove();
        }, 5000);
    }

    battleDiv.innerHTML = `
        <h1>Batalha contra o Vírus!</h1>
        <p id="status">Escolha um ataque para lutar!</p>
        <button id="atacar">Atacar</button>
        <button id="defender">Defender</button>
        <p id="playerHP">Seu HP: 100</p>
        <p id="virusHP">HP do Vírus: 100</p>
    `;
    main.appendChild(battleDiv);

    let playerHP = 100;
    let virusHP = 100;
    const status = document.getElementById("status");
    const playerHPElement = document.getElementById("playerHP");
    const virusHPElement = document.getElementById("virusHP");

    function encerrarBatalha(vitoria) {
        batalhaFinalizada = true;
        clearInterval(virusInterval); // para o movimento do vírus
        const virus = document.getElementById("virus");

        if (vitoria) {
            status.innerText = "Você venceu! O vírus foi eliminado!";
            tocarMusicaVitoria();
            setTimeout(() => {
                if (virus) virus.remove();
                document.getElementById("batalha")?.remove();
                main.innerHTML = mainBackup;
            }, 4000);
        } else {
            status.innerText = "Você perdeu! O site será fechado.";
            tocarMusicaDerrota();
            setTimeout(() => {
                window.location.href = "about:blank";
            }, 4000);
        }
    }

    document.getElementById("atacar").addEventListener("click", () => {
        if (batalhaFinalizada) return;

        const playerDamage = Math.floor(Math.random() * 20) + 5;
        const virusDamage = Math.floor(Math.random() * 20) + 5;

        virusHP -= playerDamage;
        virusHP = Math.max(0, virusHP);
        status.innerText = `Você atacou e causou ${playerDamage} de dano!`;
        virusHPElement.innerText = `HP do Vírus: ${virusHP}`;

        if (virusHP <= 0) {
            encerrarBatalha(true);
            return;
        }

        setTimeout(() => {
            if (batalhaFinalizada) return;
            playerHP -= virusDamage;
            playerHP = Math.max(0, playerHP);
            status.innerText += ` O vírus atacou e causou ${virusDamage} de dano!`;
            playerHPElement.innerText = `Seu HP: ${playerHP}`;

            if (playerHP <= 0) {
                encerrarBatalha(false);
            }
        }, 1000);
    });

    document.getElementById("defender").addEventListener("click", () => {
        if (batalhaFinalizada) return;

        const virusDamage = Math.floor(Math.random() * 10) + 2;
        playerHP -= virusDamage;
        playerHP = Math.max(0, playerHP);
        status.innerText = `Você se defendeu! O vírus causou apenas ${virusDamage} de dano.`;
        playerHPElement.innerText = `Seu HP: ${playerHP}`;

        if (playerHP <= 0) {
            encerrarBatalha(false);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body");

    // Criando o vírus corretamente
    const virus = document.createElement("div");
    virus.id = "virus";
    virus.classList.add("virus");
    virus.style.position = "absolute";
    virus.style.width = "20px";
    virus.style.height = "20px";
    virus.style.backgroundColor = "black";
    virus.style.borderRadius = "50%";
    virus.style.cursor = "pointer";
    body.appendChild(virus);

    function moveVirus() {
        const maxWidth = window.innerWidth - 50;
        const maxHeight = window.innerHeight - 50;

        const newX = Math.random() * maxWidth;
        const newY = Math.random() * maxHeight;

        virus.style.left = `${newX}px`;
        virus.style.top = `${newY}px`;
    }

    virusInterval = setInterval(moveVirus, 1200);

    virus.addEventListener("click", () => {
        alert("Me pegou!");
        batalha();
    });
});
