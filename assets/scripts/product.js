// Martin Medina (nº de matricule : 20235219)

// Le serveur utilisé pour les requêtes AJAX est Live Server de VSCode (extension : Live Server).



// Initialisation ou récupération des données dans Local Storage

var notification = $("#dialog");
notification.hide()


if (localStorage.getItem("produitsPanier") == null){
    localStorage.setItem('produitsPanier',0);
};

var produitsPanier = localStorage.getItem("produitsPanier");


if (produitsPanier === '0'){
    document.getElementsByClassName('count')[0].style.visibility = 'hidden';
} 
else{
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
};

if (localStorage.getItem('numProduit') == null){
    localStorage.setItem('numProduit',0);
};

var numProduit = parseInt(localStorage.getItem("numProduit"));


// Recherche du ID dans l'URL
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');



const xhttp = new XMLHttpRequest();

xhttp.open("GET", "./data/products.json", true);

xhttp.send();

var productSelected

xhttp.onreadystatechange = function(){
    if (this.readyState==4 && this.status==200){

        var produits = JSON.parse(this.responseText);

        var found = false

        // Le ID de l'URL est celui d'un produit qui existe
        for (let produit of produits){
            if (produit.id == parseInt(id)){
                productSelected = produit
                found = true
                break;
            };
        };

        // Introduction des éléments du produit dans la page
        const name = document.querySelector('#product-name');

        const image = document.getElementById('product-image');

        const description = document.querySelector('#product-desc');

        const features = document.querySelector('#product-features');

        const price = document.querySelector('#product-price');

        if (found == true){
            name.innerHTML = productSelected.name;
            
            image.src = `./assets/img/${productSelected.image}`;
            image.alt = productSelected.name;
            
            description.innerHTML = productSelected.description;

            for (let feature of productSelected.features){
                features.innerHTML += `<li>${feature}</li>`;
            };

            price.innerHTML = `${productSelected.price}&thinsp;$`;

        }else{ // Si le produit n'existe pas -> anonce
            name.style.visibility = 'hidden';
            image.style.visibility = 'hidden';
            description.style.visibility = 'hidden';
            features.style.visibility = 'hidden';
            price.style.visibility = 'hidden';

            document.getElementsByClassName("col")[1].style.visibility = 'hidden'

            const errorMessage = document.querySelector('#not-found')
            errorMessage.innerHTML = "Page non trouvée."
        };
    };
};


// Ajouter produit au panier 
function ajouterProduit(){

    // Afficher la notification
    notification.show()

    // Après 5 secondes, cacher la notification
    setTimeout(function(){
        notification.hide()
    },5000);

    // Quantité à ajouter du produit 
    var quantite = document.getElementById("product-quantity").value

    // Nouvelle quantité de produits
    localStorage.setItem('produitsPanier', parseInt(produitsPanier)+parseInt(quantite))
    document.getElementsByClassName('count')[0].style.visibility = 'visible';
    produitsPanier = localStorage.getItem("produitsPanier");
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;

    // Information sur le produit ajouté
    var produitAjoute = {
        'index' : numProduit,
        'id' : productSelected.id,
        'name' : productSelected.name, 
        'quantity' : quantite,
        'price' : productSelected.price,
        'total' : (parseFloat(quantite)*parseFloat(productSelected.price))
        };


    // Eviter la duplication du produit dans le panier
    var existant = false

    for (let i = 0; i<numProduit; i++){

        if(localStorage.getItem(`produit${i}`) != null){

            var produitExistant = JSON.parse(localStorage.getItem(`produit${i}`));

            // Si le produit exite, modifier les informations du produit existant
            if (produitExistant.name == productSelected.name){
                produitExistant.quantity = parseInt(produitExistant.quantity) + parseInt(quantite);
                produitExistant.total += (parseFloat(productSelected.price)*parseFloat(quantite));
                localStorage.setItem(`produit${i}`, JSON.stringify(produitExistant));
                existant = true;
                break;
            };
        };
    };

    if (existant == false){
        localStorage.setItem(`produit${numProduit}`,JSON.stringify(produitAjoute));

        localStorage.setItem('numProduit', parseInt(numProduit)+1);

        numProduit = localStorage.getItem('numProduit');
    };
};