# a savoir en resumé :

Les méthodes de votre modèle Thing permettent d'interagir avec la base de données :

save() – enregistre un Thing ;

find() – retourne tous les Things ;

findOne() – retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).

La méthode app.get() permet de réagir uniquement aux requêtes de type GET.

Désormais, votre application implémente le CRUD complet :

create (création de ressources) ;

read (lecture de ressources) ;

update (modification de ressources) ;

delete (suppression de ressources).

app.put() et app.delete() attribuent des middlewares aux requêtes de type PUT et de type DELETE.

Les méthodes updateOne() et delete() de votre modèle Thing permettent de mettre à jour ou de supprimer un Thing dans la base de données.
