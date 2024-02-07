let HT = document.querySelector("#montantHT");
let TVA = document.querySelector("#montantTVA");
let TTC = document.querySelector("#montantTTC");
let PERCENT_TVA = document.querySelector("#tauxTVA");

const LIST_INPUT_TEL = document.querySelectorAll("input[type='tel']");

for (let i = 0; i < LIST_INPUT_TEL.length; i++) {
    LIST_INPUT_TEL[i].addEventListener("keyup", function () {
        calculateTVA(this.id);
    });
}

function cleanValue(rawValue, symbol) {

    return rawValue.replace(symbol, "").trim();

}

function round(floatNumber) {
    return Math.round(floatNumber * 100) / 100;
}

function calculateTVA(id) {

    let ht;
    let tva;
    let ttc;
    let percentTVA = cleanValue(PERCENT_TVA.value, "%");

    if (id == "montantHT") {
        ht = parseFloat(cleanValue(HT.value, "€"));
        tva = round((ht * percentTVA) / 100); // mon calcul
        ttc = round(tva + ht);
        // soit ht => tva + ttc
        TVA.value = tva;
        TTC.value = ttc;

    } else if (id == "montantTVA") {
        tva = parseFloat(cleanValue(TVA.value, "€"));
        ht = round(tva / (percentTVA / 100)); // calcul
        ttc = round(ht + tva); // calcul
        // soit tva => ht + ttc
        HT.value = ht;
        TTC.value = ttc;

    } else {
        // ttc => ht + tva
        ttc = parseFloat(cleanValue(TTC.value, "€"));
        ht = round(ttc / (1 + percentTVA / 100))// calcul
        tva = round(ttc - ht);  // calcul
        HT.value = ht;
        TVA.value = tva;
    }

    
document.getElementById('totalTva').innerHTML =
'Montant HT : ' + ( ht ) +
'<br>Montant TVA : ' + (tva) +
'<br>Montant TTC : ' + (ttc);




}

    let boutonsTauxTVA = document.querySelectorAll('.appliqueTauxTVA input[name="appliqueTauxTVA"]');
    boutonsTauxTVA.forEach(function (bouton) {
      bouton.addEventListener('click', function () {
       let nouveauTauxTVA = bouton.value;
        PERCENT_TVA.value = nouveauTauxTVA;
  
    
        calculateTVA();
      });
    });
  

  