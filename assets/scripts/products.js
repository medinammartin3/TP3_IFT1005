// Martin Medina (nº de matricule : 20235219)

// Le serveur utilisé pour les requêtes AJAX est Live Server de VSCode (extension : Live Server).



// Initialisation ou récupération des données dans Local Storage

if (localStorage.getItem("produitsPanier") == null){
    localStorage.setItem('produitsPanier',0)
};

var produitsPanier = localStorage.getItem("produitsPanier");

if (produitsPanier === '0'){
    document.getElementsByClassName('count')[0].style.visibility = 'hidden';
} 
else{
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
};


// Classement des éléments au chargemement de la page
window.onload = function() {
    selectCategory('tous-les-produits')
    selectCriteria('bas-haut')
};

var selectedCriteria = 'bas-haut'

var selectedCategory = 'tous-les-produits'


var listeProduits = []


// Classement par catégorie
function selectCategory(category){

    document.getElementById(selectedCategory).className = '';

    selectedCategory = category

    document.getElementById(selectedCategory).className = 'selected';

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "./data/products.json", true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200){
    
            var produits = JSON.parse(this.responseText);
    
            const listeProduitsHTML = document.querySelector('#products-list')
    
            listeProduitsHTML.innerHTML = '';

            // Catégorie précise
            if (category !== "tous-les-produits"){

                listeProduits = []

                for (let produit of produits){
                    if (produit.category === category){
                        listeProduits.push(produit)
                    };
                };
            }else{ // Tous les produits
                listeProduits = produits
            };
            

            // Insertion des éléments dans la page
            for (let produit of listeProduits){
                listeProduitsHTML.innerHTML += 
                `
                <div class="product">
                    <a href="./product.html" title="En savoir plus...">
                        <h2>${produit.name}</h2>
                        <img alt="${produit.name}" src="./assets/img/${produit.image}">
                        <p class="price"><small>Prix</small> ${produit.price}&thinsp;$</p>
                    </a>
                </div>
                `
            };
        }; 
    };
    selectCriteria(selectedCriteria); // Conserver le critère de classement sélectionné
};



// Classement par ordre (alphabétique ou prix)
function selectCriteria(criteria){

    document.getElementById(selectedCriteria).className = '';

    selectedCriteria = criteria

    document.getElementById(selectedCriteria).className = 'selected';

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "./data/products.json", true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200){

            var produits = JSON.parse(this.responseText);
    
            const listeProduitsHTML = document.querySelector('#products-list')
    
            listeProduitsHTML.innerHTML = '';

            const nombreProduits = document.querySelector('#products-count')

            nombreProduits.innerHTML = `${listeProduits.length} produits`

            // Bas - haut (prix)
            if (criteria === 'bas-haut'){
                listeProduits = listeProduits.sort(function (a, b) {
                return a.price - b.price;
            });

            // Haut - bas (prix)
            } else if (criteria === 'haut-bas'){
                listeProduits = listeProduits.sort(function (a, b) {
                    return a.price - b.price;
                });
                listeProduits = listeProduits.reverse()
            
            // A - Z (alphabétique)
            } else if (criteria === 'a-z'){
                listeProduits = listeProduits.sort(function(a, b) {    
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {    
                        return 1;    
                    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {    // Algorithme de https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/
                        return -1;    
                    }    
                    return 0;    
                });
            
            // Z - A (alphabétique)
            }else if (criteria === 'z-a'){
                listeProduits = listeProduits.sort(function(a, b) {    
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {    
                        return 1;    
                    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {    // Algorithme de https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/
                        return -1;    
                    }    
                    return 0;    
                });
        
                listeProduits = listeProduits.reverse();
            };
    
            // Insertion des produits dans la page
            for (let produit of listeProduits){
                listeProduitsHTML.innerHTML += 
                `
                <div class="product">
                    <a href="./product.html?id=${produit.id}" title="En savoir plus...">
                        <h2>${produit.name}</h2>
                        <img alt="${produit.name}" src="./assets/img/${produit.image}">
                        <p class="price"><small>Prix</small> ${produit.price}&thinsp;$</p>
                    </a>
                </div>
                `
            };
        }; 
    };
};
