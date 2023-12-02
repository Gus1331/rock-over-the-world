let odsTexts = [
    `Muitos artistas de rock escreveram músicas sobre a pobreza e as desigualdades sociais.
    Essas músicas podem ajudar a conscientizar o público sobre esses problemas e inspirar as pessoas a tomar
    medidas para combatê-los. <br><br>
    “Why do they always send the poor?” - System of a Down (2005), em um contexto que a música fala sobre a
    desigualdade quando enviam somente pessoas de classe social baixa à guerra.`,
    `Também pode ser uma forma de expressão pessoal e de autoconhecimento. 
    Ouvir rock pode ajudar as pessoas a explorar seus sentimentos e emoções, 
    o que pode ser uma experiência terapêutica e transformadora. 
    Além de haver músicas incentivando  as pessoas a procurarem ajuda quando necessário. <br><br>
    “I will help you die, I will run through you, Now I rule you too” - Metallica (1986), 
    alertando sobre efeitos das drogas.`,
    `Muitas bandas abordam o tema que a educação é a base da evolução humana, 
    sempre enfatizando que cada um tem que buscar seu próprio cohecimento. <br><br>
    “I'll choose my fate...  You don't have to be old to be wise” - Judas Priest (1980), 
    falando sobre pensar e entender as prórias ações ao invés de seguir ordens cegamente.`,
    `No ODS 1, as músicas conscientizam a pobreza e seus aspectos negativos, 
    que seriam a desigualdade de direitos e oportunidades, o que ocorre muito na sociedade. <br><br>
    “Politicians hide themselves away, They only started the war” - Black Sabbath (1970), 
    criticando que cargos politicos iniciam as guerras mas nunca lutam por elas`,
    `Muitos festivais de rock e shows têm adotado práticas sustentáveis, como a redução do uso de plástico, 
    energia limpa e apoio a iniciativas de preservação ambiental. <br><br>
    O Rock in Rio tem trabalhado em programas de compensação ambiental para equilibrar suas emissões de carbono, 
    investindo em projetos de conservação e sustentabilidade.`,
    `Algumas músicas de rock transmitem mensagens de esperança, 
    incentivando a mudança positiva na sociedade e apoiando a criação de instituições mais eficazes e justas. <br><br>
    "What's so civil about war anyway?" - Guns ‘N’ Roses (1991), 
    essa música questiona-se a natureza da guerra e a falta de sentido na violência.`,
]


function mostrarODS(n){
    switch(n){
        case 1:
            topCard.innerHTML= odsTexts[0];
            topCard.style.backgroundColor = `#E5233D`;
            break;
        case 3:
            topCard.innerHTML= odsTexts[1];
            topCard.style.backgroundColor = `#4CA146`;
            break;
        case 4:
            topCard.innerHTML= odsTexts[2];
            topCard.style.backgroundColor = `#C7212F`;
            break;
        case 10:
            topCard.innerHTML= odsTexts[3];
            topCard.style.backgroundColor = `#DD1367`;
            break;
        case 13:
            topCard.innerHTML= odsTexts[4];
            topCard.style.backgroundColor = `#407F46`;
            break;
        case 16:
            topCard.innerHTML= odsTexts[5];
            topCard.style.backgroundColor = `#136A9F`;
            break;

    }
}