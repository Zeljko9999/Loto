
const button = document.getElementById("play");
button.addEventListener("click", onPlayButtonClick);

// funkcija koja se poziva na klik botuna "igraj"
//funkcija vrši provjeru da li vec postoje izvučeni brojevi
function onPlayButtonClick() {
    let content = document.getElementById("drawn-numbers").textContent;
    if (content === "") { //ako je artcle element prazan pozovi funkciju za generiranje brojeva
        getNumber();
    } else {
        document.getElementById("drawn-numbers").innerHTML = ""; //inace izbrisi postojeci sadrzaj ...
        getNumber();                                             //...  i generiraj nove bojeve
    }
}

// funkcija koja generira random brojeve
function generateRandomNumber() {
    return Math.floor((Math.random() * 35) + 1);
}

// funkcija provjerava da li se novogenerirani broj podudara s nekim prethodno generiranim
function checkRandomNumber(array, rand) {
    let correctNumber = rand;
    let trash = 0;
    for (let i = 0; i < array.length - 1; i++) {  // prođi kroz niz i usporedi brojeve u njemu sa novegeneriranim brojem
        if (rand == array[i]) {
            trash = rand;
        }
    }
    if (trash != 0) { //ako je novogenerirani broj jednak nekom u nizu, ...
        rand = generateRandomNumber(); //... u kojem se nalaze prethodni brojevi, onda generiraj novi broj
        correctNumber = checkRandomNumber(array, rand);
        return correctNumber;

    } else {  // ako nema podudarnosti, vrati izvorni broj
        return correctNumber;
    }
}

// bubble algoritam - sortiranje brojeva
function bubbleAlgorithm(arr, n) {
    let temp;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 2; j++) {
            if (arr[j] > arr[j + 1]) {

                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// funkcija dohvaca 8 random brojeva, trazi te brojeve među 35 ponuđenih brojeva, te ih ispisuje
function getNumber() {

    const allNumbers = document.querySelectorAll("#numbers div"); // dohvacanje ponuđenih brojeva iz article elementa "numbers"
    const sectionDrawnNumbers = document.getElementById("drawn-numbers");
    const numbersArray = []; // niz u koji se sprema 8 random brojeva
    for (let i = 0; i < 8; i++) {

        let randomNumber = generateRandomNumber();
        numbersArray[i] = randomNumber;

        // algoritam koji rješava problem dupliciranja brojeva
        for (let k = 0; k < numbersArray.length; k++) {
            if (i != 0 && k != 0) {
                if (randomNumber == numbersArray[k - 1]) {
                    randomNumber = generateRandomNumber();
                    randomNumber = checkRandomNumber(numbersArray, randomNumber); //pošalji niz i novogenerirani broj...
                    numbersArray[i] = randomNumber;                               //...u funkciju za provjeru podudarnosti
                }
            }
        }
    }

    const arrayLength = numbersArray.length;
    const sortedArray = bubbleAlgorithm(numbersArray, arrayLength); // poziv funkcije za sortiranje

    /* ovaj dio koda dohvaca ponuđene brojeve i uspoređuje ih sa random brojevima,
     te ih ispisuje u article element ispod buttona */
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < allNumbers.length; j++) {
            let number = allNumbers[j].querySelector("span").textContent; // dohvati 1 ponuđeni broj
            if (+number == sortedArray[i]) {
                let divClass = allNumbers[j].className; // klasa izvucenog broja (klase se razlikuju u boji loptice)

                let ballElement = `<div class="${divClass}"><span class="number">${number}</span></div>`; // html loptice

                document.getElementById("drawn-numbers").insertAdjacentHTML("beforeend", ballElement); // dodaj loptice u article element
            }
        }
    }
}