// Martin Medina (nº de matricule : 20235219)

// Le serveur utilisé pour les requêtes AJAX est Live Server de VSCode (extension : Live Server).




// Initialisation ou récupération des données dans Local Storage

if (localStorage.getItem("produitsPanier") == null){
    localStorage.setItem('produitsPanier',0)
};

var produitsPanier = localStorage.getItem("produitsPanier");

if (produitsPanier === '0'){
    document.getElementsByClassName('count')[0].style.visibility = 'hidden';
    document.getElementById("panier-achats").style.visibility = 'hidden';
    document.getElementById("bout-et-tot").style.visibility = 'hidden';
    document.getElementById("aucun-produit").innerHTML ='Aucun produit dans le panier';
} 
else{
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
};

if (localStorage.getItem('numProduit') == null){
    localStorage.setItem('numProduit',0);
};

var numProduits = localStorage.getItem('numProduit')



// Liste des produits
var listeProduits = []

for (let i = 0; i<numProduits; i++){
    if (localStorage.getItem(`produit${i}`) != null){
        listeProduits.push(JSON.parse(localStorage.getItem(`produit${i}`)));
    };
};

// Triage des produits par ordre alphabétique des produits
for (let j = 0; j<listeProduits.length; j++){
    listeProduits = listeProduits.sort(function(a, b) {    
        if (a.name > b.name) {    
            return 1;    
        } else if (a.name < b.name) {    // Algorithme de https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/
            return -1;    
        }    
        return 0;
    });
};

localStorage.setItem('totalAmount', 0)
var totalAmount = parseFloat(localStorage.getItem('totalAmount'))


// Introduction des produits au panier
for (let produit of listeProduits){
    if (produit.quantity == '1'){ // Bouton d'enlever produit désactivé si quantité = 1
        ligneTableau = `<tr id="produit${produit.index}">
                            <td><button title="Supprimer" class="remove-item-button" onclick="removeProduct('produit${produit.index}')"><i class="fa fa-times"></i></button></td>
                            <td><a href="./product.html?id=${produit.id}l">${produit.name}</a></td>
                            <td>${produit.price}&thinsp;$</td>
                            <td>
                                <div class="row">
                                <div class="col">
                                    <button title="Retirer" disabled="" class="remove-quantity-button" onclick="lessProduct('produit${produit.index}')" id="less-produit${produit.index}"><i class="fa fa-minus"></i></button>
                                </div>
                                <div class="col" id="produit${produit.index}-quantity">${produit.quantity}</div>
                                <div class="col">
                                    <button title="Ajouter" class="add-quantity-button" onclick="addProduct('produit${produit.index}')"><i class="fa fa-plus"></i></button>
                                </div>
                                </div>
                            </td>
                            <td class="price" id="produit${produit.index}-total">${produit.total}&thinsp;$</td>
                        </tr>`
    } else{ // Bouton activé
        ligneTableau = `<tr id="produit${produit.index}">
                            <td><button title="Supprimer" class="remove-item-button" onclick="removeProduct('produit${produit.index}')"><i class="fa fa-times"></i></button></td>
                            <td><a href="./product.html?id=${produit.id}l">${produit.name}</a></td>
                            <td>${produit.price}&thinsp;$</td>
                            <td>
                                <div class="row">
                                <div class="col">
                                    <button title="Retirer" class="remove-quantity-button" onclick="lessProduct('produit${produit.index}')" id="less-produit${produit.index}"><i class="fa fa-minus"></i></button>
                                </div>
                                <div class="col" id="produit${produit.index}-quantity">${produit.quantity}</div>
                                <div class="col">
                                    <button title="Ajouter" class="add-quantity-button" onclick="addProduct('produit${produit.index}')"><i class="fa fa-plus"></i></button>
                                </div>
                                </div>
                            </td>
                            <td class="price" id="produit${produit.index}-total">${(produit.total).toFixed(2)}&thinsp;$</td>
                </tr>`
    };
    tableBody = $("table tbody");
    tableBody.append(ligneTableau);
    totalAmount += produit.total;
};


// Prix total de la commande
$("#total-amount").append(`${totalAmount.toFixed(2)+'&thinsp;$'}`);
localStorage.setItem('totalAmount', totalAmount)
totalAmount = parseFloat(localStorage.getItem('totalAmount'))


// Enlever un produit
function removeProduct(produit){
    produit = JSON.parse(localStorage.getItem(produit));

    var confirmer = confirm("Voulez-vous supprimer le produit du panier ?");
    
    // Si le client confirme qu'il veut éliminer le produit
    if (confirmer == true){
        $(`#produit${produit.index}`).replaceWith();

        // Nouvelle quantité de produits dans le panier
        produitsPanier = parseInt(produitsPanier)-produit.quantity
        localStorage.setItem('produitsPanier', produitsPanier)
        document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
        if (produitsPanier === 0){
            document.getElementsByClassName('count')[0].style.visibility = 'hidden';
            document.getElementById("panier-achats").style.visibility = 'hidden';
            document.getElementById("bout-et-tot").style.visibility = 'hidden';
            document.getElementById("aucun-produit").innerHTML ='Aucun produit dans le panier';
        } 
        else{
            document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
        };

        // Nouveau prix total de la commande
        totalAmount -= produit.total;
        var newTotalAmount = `<strong id="total-amount">${totalAmount.toFixed(2)}&thinsp;$</strong>`;
        $("#total-amount").replaceWith(newTotalAmount);
        localStorage.setItem('totalAmount', totalAmount)
        totalAmount = parseFloat(localStorage.getItem('totalAmount'))

        // Élimination du produit dans le Local Storage
        localStorage.removeItem(`produit${produit.index}`)
    };
};


// Enléver une quantité d'un produit
function lessProduct(produit){
    produit = JSON.parse(localStorage.getItem(produit));
    
    // Nouvelle quantité de produits
    produit.quantity = parseInt(produit.quantity)-1;
    var newQuantity = `<div class="col" id="produit${produit.index}-quantity">${produit.quantity}</div>`;
    $(`#produit${produit.index}-quantity`).replaceWith(newQuantity);

    if (produit.quantity == 1){
        var lessButton = `<button title="Retirer" class="remove-quantity-button" disabled="" onclick="lessProduct('produit${produit.index}')" id="less-produit${produit.index}"><i class="fa fa-minus"></i></button>`;
        $(`#less-produit${produit.index}`).replaceWith(lessButton);
    };

    // Nouveau prix total du produit
    produit.total = produit.total-produit.price;
    var newTotalPrice = `<td class="price" id="produit${produit.index}-total">${(produit.total).toFixed(2)}&thinsp;$</td>`
    $(`#produit${produit.index}-total`).replaceWith(newTotalPrice);

    localStorage.setItem(`produit${produit.index}`, JSON.stringify(produit))
    
    // Nouveau prix total de la commande
    totalAmount -= produit.price;
    var newTotalAmount = `<strong id="total-amount">${totalAmount.toFixed(2)}&thinsp;$</strong>`;
    $("#total-amount").replaceWith(newTotalAmount);
    localStorage.setItem('totalAmount', totalAmount)
    totalAmount = parseFloat(localStorage.getItem('totalAmount'))

    // Modification de la quantité du produit dans le Local Storage
    produitsPanier = parseInt(produitsPanier)-1
    localStorage.setItem('produitsPanier', produitsPanier)
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
};


// Ajouter une quantité d'un produit
function addProduct(produit){
    produit = JSON.parse(localStorage.getItem(produit));
    
    // Nouvelle quantité de produits
    produit.quantity = parseInt(produit.quantity)+1;
    var newQuantity = `<div class="col" id="produit${produit.index}-quantity">${produit.quantity}</div>`;
    $(`#produit${produit.index}-quantity`).replaceWith(newQuantity);
    var lessButton = `<button title="Retirer" class="remove-quantity-button" onclick="lessProduct('produit${produit.index}')" id="less-produit${produit.index}"><i class="fa fa-minus"></i></button>`;
    $(`#less-produit${produit.index}`).replaceWith(lessButton);

    // Nouveau prix total du produit
    produit.total = produit.total+produit.price;
    var newTotalPrice = `<td class="price" id="produit${produit.index}-total">${(produit.total).toFixed(2)}&thinsp;$</td>`
    $(`#produit${produit.index}-total`).replaceWith(newTotalPrice);

    localStorage.setItem(`produit${produit.index}`, JSON.stringify(produit))
    
    // Nouveau prix total de la commande
    totalAmount += produit.price;
    var newTotalAmount = `<strong id="total-amount">${totalAmount.toFixed(2)}&thinsp;$</strong>`;
    $("#total-amount").replaceWith(newTotalAmount);
    localStorage.setItem('totalAmount', totalAmount)
    totalAmount = parseFloat(localStorage.getItem('totalAmount'))

    // Modification de la quantité du produit dans le Local Storage
    produitsPanier = parseInt(produitsPanier)+1
    localStorage.setItem('produitsPanier', produitsPanier)
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
};


// Vider le panier
function viderPanier(){
    var confirmer = confirm("Voulez vous supprimer tous les produits du panier ?");
    
    // Si le client confirme sa décision
    if (confirmer == true){
        // Panier vide
        $("tbody").replaceWith("<tbody></tbody>");

        // Anonce -> Pas de produits dans le panier
        produitsPanier = 0
        localStorage.setItem('produitsPanier', produitsPanier)
        document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
        document.getElementsByClassName('count')[0].style.visibility = 'hidden';
        document.getElementById("panier-achats").style.visibility = 'hidden';
        document.getElementById("bout-et-tot").style.visibility = 'hidden';
        document.getElementById("aucun-produit").innerHTML ='Aucun produit dans le panier';

        // Nouveau total de produits
        totalAmount = 0;
        localStorage.setItem('totalAmount', totalAmount)

        // Élimination de tous les produits du Local Storage
        for (let i = 0; i<numProduits; i++){
            if (localStorage.getItem(`produit${i}`) != null){
                localStorage.removeItem(`produit${i}`)
            };
        };
    };
};