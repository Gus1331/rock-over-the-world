/* BANNER VIDEO */

let videos = [
    "hard",
    "alternative",
    "metal",
    "classico",
    "grunge",
    "roll"
]
let randomVideo = parseInt(Math.random() * videos.length);
let currentVideo = randomVideo;

function startVideo() {
    div_home.innerHTML = `
        <video id="ativeVideo" muted autoplay loop src="assets/videos/${videos[randomVideo]}.mp4"></video>
        <div class="bannerGradient"></div>
    `;

    setInterval(videoLoop, 15000);
}

function videoLoop() {
    let nextVideo;

    if (currentVideo == videos.length - 1) {
        nextVideo = 0
    }
    else {
        nextVideo = currentVideo + 1;
    }


    currentVideo = nextVideo

    div_home.innerHTML = `
    <video id="ativeVideo" muted autoplay loop src="assets/videos/${videos[currentVideo]}.mp4"></video>
    <div class="bannerGradient"></div>
    `;
}

/* DESCRIÇÃO INSTRUMENTOS */

let writePosition; // define se vai ser mostrado a frase na primeira ou segunda posição
let instrumentPosition; // define o instrumento a ser definido
let i = 0; // variavel de index a ser incrementada


function describeInstrument(instrument, position) {
    instrumentPosition = instrument;
    writePosition = position;
    
    typing = setInterval(type, 44); // digita caractere a cada x ms
    

    if (writePosition == 1) {
        typing01.style.display = "inline-block"; // mostra o cursor de digitação
    }
    else {
        typing02.style.display = "inline-block";
    }
}

function type() {
    let descriptions = [ // lista com a descrição dos instrumentos
        "A guitarra elétrica é um dos instrumentos mais emblemáticos do rock, pois ela desempenha um papel central rornecendo riffs poderosos, acordes marcantes, solos impressionantes e contribui muito para a energia e a emoção das músicas",
        "A bateria é fundamental para a energia e o ritmo do rock, com tambores, pratos e outros elementos de percussão que impulsionam as músicas.",
        "O baixo elétrico fornece a base rítmica e melódica para as músicas de rock, criando uma fundação sólida para a guitarra e a bateria.",
        "Os vocais desempenham um papel importante no rock, com cantores e cantoras expressando letras e melodias com paixão e emoção.",
        "O violão oferece uma dimensão diversificada, contribuindo para a versatilidade e a riqueza sonora desse gênero musical.",
        "O teclado e o piano são usados em uma variedade de estilos de rock, desde baladas suaves até rock progressivo complexo.",
        "O violoncelo é ocasionalmente incorporado no rock, especialmente em composições mais experimentais, para adicionar profundidade e textura.",
        " Saxofones, flautas e trompetes e outros instrumentos de sopro contribuem para a diversidade sonora e possibilitam a exploração de novos arranjos musicais no contexto do rock e de seus variados estilos.",
    ];
    let text = descriptions[instrumentPosition] // escolhe qual elemento do array vai ser colocado na tela


    if (writePosition == 1) {
        description01.innerHTML += `${text[i]}`; // coloca o caractere na tela
    }
    else if (writePosition == 2) {
        description02.innerHTML += `${text[i]}`;
    }

    i++; // incrementa index

    if (i == text.length){
        i = 0;
        clearInterval(typing);
        setTimeout(() => {
            typing01.style.display = "none";
            typing02.style.display = "none";
        }, 500)
    }
}
function stopDescribeInstrument() { //reseta e para o processo de digitação
    i = 0;
    clearInterval(typing);
    description01.innerHTML = "";
    description02.innerHTML = "";
    typing01.style.display = "none";
    typing02.style.display = "none";

}
