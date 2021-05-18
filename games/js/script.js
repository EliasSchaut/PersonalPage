const games = [
    {"title": "Kartenspiel-Simulator", "src": "img/cards.jpg", "href": "https://playingcards.io/"},
    {"title": "Cards-Against-Humanity", "src": "img/CardsAgainstHumanity.png", "href": "https://cardsagainstformality.io/rooms"},
    {"title": "Codenames", "src": "img/Codenames.jpg", "href": "https://codenames.game/room/create"},
    {"title": "Curve-Fever", "src": "img/CurveFever.png", "href": "https://curvefever.pro/"},
    {"title": "Gartic-Phone", "src": "img/garticphone.jpg", "href": "https://garticphone.com/de"},
    {"title": "Krunker-io", "src": "img/krunker-io.png", "href": "https://krunker.io/"},
    {"title": "MegaProRacer", "src": "img/MegaProRacer.jpg", "href": "https://megaproracer.net/"},
    {"title": "Ich-hab-noch-nie", "src": "img/NeverHaveIEver.png", "href": "https://ich-habe-noch-nie-online.de/"},
    {"title": "Poker", "src": "img/Poker.png", "href": "https://www.pokernow.club/"},
    {"title": "The-Button", "src": "img/PushButton.png", "href": "https://willyoupressthebutton.com/"},
    {"title": "SecretHitler", "src": "img/SecretHitler.png", "href": "https://secrethitler.io/game/"},
    {"title": "Montagsmaler", "src": "img/Skribbl.jpg", "href": "https://skribbl.io/"},
    {"title": "Stadt-Land-Fluss", "src": "img/StadtLandFluss.jpg", "href": "https://stadtlandflussonline.net/"},
    {"title": "Uno", "src": "img/Uno.png", "href": "https://play.unofreak.com/game"},
    {"title": "Werwolf", "src": "img/Werwoelfe.jpg", "href": "https://play.werwolfonline.eu/Werwolf.php"}
]

const body = document.getElementById("containter")
for (let i = 0; i < games.length; i++) {
    const div = document.createElement("div")
    div.setAttribute("class", "imgLink")

    const img = document.createElement("img")
    img.setAttribute("src", games[i].src)
    img.setAttribute("height", "300")
    img.setAttribute("width", "300")
    img.setAttribute("alt", games[i].title)

    const a = document.createElement("a")
    a.setAttribute("href", games[i].href)
    a.innerHTML = games[i].title

    div.append(img)
    div.append(a)
    body.append(div)
}
