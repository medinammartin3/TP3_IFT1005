// Martin Medina (nº de matricule : 20235219)

// Le serveur utilisé pour les requêtes AJAX est Live Server de VSCode (extension : Live Server).




// Initialisation ou récupération des données dans Local Storage

var produitsPanier = localStorage.getItem("produitsPanier");

if (produitsPanier === '0'){
    document.getElementsByClassName('count')[0].style.visibility = 'hidden';
} 
else{
    document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
};


// Insertion du Nom et du Prénom du client
var nom = localStorage.getItem('nom');

var prenom = localStorage.getItem('prenom')

$('#name').replaceWith(`<h1 id="name">Votre commande est confirmée ${prenom} ${nom}!</h1>`);


// Insertion du numéro de la commande
var numCommande = localStorage.getItem('numeroCommande')

$('#confirmation-number').replaceWith(`<strong id="confirmation-number">${'0'.repeat(5-numCommande.length) + numCommande}</strong>`);