(function () {


    let leSlider = document.getElementById('slider')
    let boutSlider = document.querySelectorAll('.bouton-slider label')
    //console.log( boutSlider.length);

    //séléction du bouton suivant
    let btnSuivant = document.querySelectorAll('.suivant')
    //séléction des formulaires
    let lesFormulaires = document.querySelectorAll('form')

    //séléction du deuxième div de page d'introduction
    let elmCentral = document.querySelector('.introduction div:nth-of-type(2)')

    //page d'introduction
    let elmIntro = document.querySelector('.introduction div:nth-of-type(3)')
    elmIntro.addEventListener('animationend', function () {
        // elmIntro.parentNode.style.animation = 'refermeEntete 1s 1.5s both'

        caractereParCaractere(0)
        console.log(elmIntro.parentNode)

    })






    let titreCentral = 'AIRLINES'

    function caractereParCaractere(position) {

        // console.log(titreCentral[position++]) // position= position +1

        if (position < titreCentral.length) {

            creerElementDOM(position)
            setTimeout(function () //exécute une fois l'animation
            {
                caractereParCaractere(++position)

            }, 500)


        } else {
            //exécute l'animation du positonnement du header
            elmIntro.parentNode.style.animation = 'refermeEntete 1s 1.5s both'

        }
    }

    function creerElementDOM(position) {

        console.log(titreCentral[position])
        let elm = document.createElement('span')
        elm.innerHTML = titreCentral[position]
        elmCentral.appendChild(elm)


    }

    //tableau du profil(rassemblage d'information collecté)
    let objProfil = {}
    console.log(objProfil);




    // Quand on clic sur chaque bouton les formulaires glissent de droite à gauche
    for (let k = 0; k < boutSlider.length; k++) {
        boutSlider[k].addEventListener('mousedown', function () {

            initialiseBoutSlider();
            glisseSlider(k);
        })
    }


    function glisseSlider(k) {
        //  console.log(k)
        console.log(leSlider.tagName)

        leSlider.style.transform = `translateX(-${k*100}vw)`
        boutSlider[k].classList.add('couleurBoutonSelectionne')
        console.log(leSlider)
    }

    //Fonction qui permet d'enlever la classe lorsque on passe au bouton suivant
    function initialiseBoutSlider() {
        for (let k = 0; k < boutSlider.length; k++) {
            boutSlider[k].classList.remove('couleurBoutonSelectionne')
        }

    }


    /* Pour chaque bouton .suivant on lui ajoute un écouteur 
     * qui permettra d'exécuter la fonction validationFormulaire(k)
     */

    for (let k = 0; k < btnSuivant.length; k++) {
        btnSuivant[k].addEventListener('mousedown', function () {
            // chaque k ième btnSuivant permettra 
            // de valider le k ième formulaire
            validationFormulaire(k)

        })
    }




    function validationFormulaire(numFormulaire) {
        // on initialise la variable erreur à false (il n'y a pas d'erreur)
        let erreur = false

        // Création d'une collection d'input pour le formulaire à traiter 
        let lesInputs = lesFormulaires[numFormulaire].querySelectorAll('input')

        // On parcourt chacun des inputs
        for (let k = 0; k < lesInputs.length; k++) {
            console.log(lesInputs[k].id)

            // on vérifie que la zone d'input n'est pas vide
            if (lesInputs[k].value != '') {

                // on récupère l'info du input dans l'objet litéral
                objProfil[lesInputs[k].id] = lesInputs[k].value

                // on sélectionne l'étiquette pour lui retirer le message d'erreur
                lesInputs[k].parentNode.querySelector('h6').classList.remove("message")

            } else {
                // on sélectionne l'étiquette pour lui ajouter le message d'erreur
                // la variable erreur devient true si on écrit rien sur les inputs.  
                lesInputs[k].parentNode.querySelector('h6').classList.add("message")
                erreur = true
                console.log(lesInputs[k].parentNode);
            }



            if (erreur == false) {
                // on utilise la fonction glisseSlider()
                // on utilise la fonction  creationGrille()
                glisseSlider(numFormulaire + 1)
                creationGrille()

            }
        }
        console.log(objProfil)
    }

    /////// Regroupement des infos collectés dans la grille  /////////////////////////////
    function creationGrille() {
        let maGrille = document.querySelector('.grille')
        let chaine = ''
        for (let cle in objProfil) {
            console.log(cle + '=' + objProfil[cle]);
            chaine += `<div>${cle}</div><div>${objProfil[cle]}</div>`
        }
        maGrille.innerHTML = chaine
    }

    /////////////////// /////////////////// /////////////////// ///////////////////
    ///////////////////Effet sur le formulaire

    /*  Selection des inputs */
    let tousLesInputsDuSlider = document.querySelectorAll('input');
    console.log(tousLesInputsDuSlider.length);


    for (let unInput of tousLesInputsDuSlider) {
        unInput.addEventListener('focus', effetEtiquette)
        unInput.addEventListener('blur', effetEtiquette)
    }

    function effetEtiquette(evt) {
        if (evt.type == 'focus') {
            /*si le input est sélectionné la classe s'active */

            evt.target.parentNode.querySelector('h6').classList.add('remonte');
            evt.target.parentNode.querySelector('input').classList.add('ligne');



        } else {
            /* Si c'est rien écrit sur l'input la classe attribué disparaît */
            if (evt.target.value == '') {
                evt.target.parentNode.querySelector('h6').classList.remove('remonte');
                evt.target.parentNode.querySelector('input').classList.remove('ligne');


            }

        }
        console.log(evt.target.parentNode);

    }







}()) // function IFE fin
