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



// Spécifications (régles) du formulaire

var form = $("#order-form");

if (form.length){
    jQuery.validator.addMethod("expiryDate", function(value, element) {
        return this.optional( element ) || /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test( value );
    }, 'Please enter a valid email address.');
    form.validate({

        // Régles
        rules:{
            firstName:{
                required: true,
                minlength: 2
            },
            lastName:{
                required: true,
                minlength: 2
            },
            email:{
                required: true,
                email: true
            },
            phone:{
                required: true,
                phoneUS: true
            },
            creditCard:{
                required: true,
                creditcard: true
            },
            creditCardExpiry:{
                required: true,
                expiryDate: true
            }
        },

        // Messages d'erreur
        messages:{
            firstName:{
                required: "Ce champ est obligatoire.",
                minlength: "Veuillez fournir au moins deux caractères."
            },
            lastName:{
                required: "Ce champ est obligatoire.",
                minlength: "Veuillez fournir au moins deux caractères."
            },
            email:{
                required: "Ce champ est obligatoire.",
                email: "L'adresse email introduite n'est pas valide."
            },
            phone:{
                required: "Ce champ est obligatoire.",
                phoneUS: "Le numéro de téléphone introduit n'est pas valide."
            },
            creditCard:{
                required: "Ce champ est obligatoire.",
                creditcard: "Le numéro de carte de crédit introduit n'est pas valide."
            },
            creditCardExpiry:{
                required: "Ce champ est obligatoire.",
                expiryDate: "La date d’expiration de votre carte de crédit est invalide."
            }
        }
    });
};



// Création de la commande

function creerComande(){

    // Si le formulaire est valide
    if (form.valid()){

        // Garder le Nom et le Prénom du client
        localStorage.setItem('prenom', document.getElementById("first-name").value);
        localStorage.setItem('nom', document.getElementById("last-name").value);
        
        // Numéro de la commande
        if (localStorage.getItem("numeroCommande") == null){
            localStorage.setItem('numeroCommande', 0);
        } else{
            var numeroCommande = localStorage.getItem("numeroCommande");
            numeroCommande = parseInt(numeroCommande) + 1;
            localStorage.setItem("numeroCommande", numeroCommande);
        };

        // Remise à 0 des produits dans le panier
        produitsPanier = 0
        localStorage.setItem('produitsPanier', produitsPanier)
        document.getElementsByClassName('count')[0].innerHTML = produitsPanier;
        document.getElementsByClassName('count')[0].style.visibility = 'hidden';

        // Remise à 0 du montant total
        totalAmount = 0;
            localStorage.setItem('totalAmount', totalAmount)

        // Élimination des produits dans le Local Storage
        var numProduits = localStorage.getItem('numProduit')
        for (let i = 0; i<numProduits; i++){
            if (localStorage.getItem(`produit${i}`) != null){
                localStorage.removeItem(`produit${i}`)
            };
        };
    };
};