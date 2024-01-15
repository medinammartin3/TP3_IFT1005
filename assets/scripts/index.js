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