# Contribuez au projet smartnews-visu-front

👍🎉 Tout d'abord merci d'avoir pris du temps pour contribuer! 🎉👍

Lorsque vous contribuez à ce projet, discutez d'abord des modifications que vous souhaitez apporter via une PR.

## Table des matières

- [Mise en place du projet](#setting-up-the-project-locally)
- [Soumettre une Pull Request](#submitting-a-pull-request)
- [S'ajouter en tant que contributeur](#add-yourself-as-a-contributor)

## Mettre en place le projet localement

Pour installer le projet vous aurez besoin de `node` et `npm`

1.  Cloner le projet

    ```sh
    # Cloner le projet
    git clone https://github.com/ugieiris/smartnews-visu-front.git

    # Naviguer dans le nouveau dossier cloné
    cd smartnews-visu-front
    ```

2.  Votre environnement nécessite `node` version >= 9.3.0 et `npm` version >= 5.5.0.

3.  Depuis la racine du projet: `npm i` pour installer toutes les dépendances

4.  Depuis la racine du projet: `npm run serve` pour lancer le projet.

> Conseils:
> Suivez le modèle du Git Flow lors de vos contributions
> Assurez-vous d'avoir la branche `develop` à jour avec un `git pull`
> Tirez une branche depuis `develop` avec `git checkout -b nom_de_la_branche`
> Poussez une première fois votre branche sur le projet `git push -u origin nom_de_la_branche`
> Poussez vos modification `git add .` `git commit -m votre_message` `git push`

## Soumettre une Pull Request

Veuillez consulter les issues et PR existants pour vérifier si quelqu'un d'autre y travaille déjà.

Veillez également à exécuter les tests, linter le code, valider les outils d'analyse statiques Sonar et XRay avant de valider vos changements.

```sh
npm run test
npm run lint
```

## S'ajouter en tant que contributeur

Ajoutez vous dans le README section "Développeurs ayant contribués"
