Exercices MongoDB



// 1. Écrire la requête qui retourne tous les documents dans la collection "restaurants"
db.mongocollec.find()

// 2. Retourner les champs restaurant_id, name, borough et cuisine pour tous les documents de la collection
db.mongocollec.find({}, {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    cuisine: 1
})

// 3. Retourner les champs restaurant_id, name, borough et cuisine pour tous les documents de la collection, cette fois-ci, sans afficher le champs _id
db.mongocollec.find({}, {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    cuisine: 1,
    _id: 0
})

// 4. Retourner les champs restaurant_id, name, borough, cuisine et zip_code de tous les documents, sans le champs _id
db.mongocollec.find({}, {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    cuisine: 1,
    _id: 0,
    'address.zipcode': 1
})

// 5. Retourner tous les restaurants qui sont dans le Bronx
db.mongocollec.find({}, {
    borough: 'Bronx'
})

// 6. Retourner les 5 premiers restaurants qui sont dans le Bronx
db.restaurants.find({"borough": "Bronx"}).limit(5);

// 7. Retourner les 5 suivants
db.restaurants.find({"borough": "Bronx"}).skip(5).limit(5);

// 8. Retourner les restaurants avec un score supérieur à 90
db.restaurants.find({grades : { $elemMatch:{"score":{$gt : 90}}}});

// 9. Retourner les restaurants avec un score supérieur à 80 et en-dessous de 100
db.restaurants.find({grades : { $elemMatch:{"score":{$gt : 80 , $lt :100}}}});

// 10. Retourner les restaurants situés à une latitude inférieure à -95.754168
db.restaurants.find({"address.coord" : {$lt : -95.754168}});

// 11. Retourner les restaurants qui (sans utiliser l'opérateur $and) :
//    - Ne préparent pas de cuisine 'American'
//    - Ont un score au dessus de 70
//    - Une latitude inférieure à -65.754168
db.restaurants.find(
               {$and:
                    [
                       {"cuisine" : {$ne :"American "}},
                       {"grades.score" : {$gt : 70}},
                       {"address.coord" : {$lt : -65.754168}}
                    ]
                }
                    );

// 12. Même requête avec l'opérateur $and
db.restaurants.find(
                           {
                             "cuisine" : {$ne : "American "},
                             "grades.score" :{$gt: 70},
                             "address.coord" : {$lt : -65.754168}
                            }
                     );


// 13. Retouner, ordonné par type de cuisine, les restaurants qui :
//    - Ne préparent pas de cuisine 'American'
//    - Ont une grade "A"
//    - En dehors de "Brooklyn"
db.restaurants.find( {
                             "cuisine" : {$ne : "American "},
                             "grades.grade" :"A",
                             "borough": {$ne : "Brooklyn"}
                       } 
                    ).sort({"cuisine":-1});

// 14. Retourner l'id, le nom, le quartier et la cuisine des resraurants dont le nom commence par "Wil"
db.restaurants.find(
{name: /^Wil/},
{
"restaurant_id" : 1,
"name":1,"borough":1,
"cuisine" :1
}
);

// 15. Retourner l'id, le nom, le quartier et la cuisine des resraurants dont le nom termine par "ces"
db.restaurants.find(
{name: /ces$/},
{
"restaurant_id" : 1,
"name":1,"borough":1,
"cuisine" :1
}
);

// 16. Retourner l'id, le nom, le quartier et la cuisine des resraurants dont le nom contient "Reg"
db.restaurants.find(
{"name": /.*Reg.*/},
{
"restaurant_id" : 1,
"name":1,"borough":1,
"cuisine" :1
}
);

// 17. Retourner les restaurants du Bronx qui servent de la cuisine américaine ou chinoise
db.restaurants.find(
{ 
"borough": "Bronx" , 
$or : [ { "cuisine" : "American " }, { "cuisine" : "Chinese" }]});

// 18. Retourner l'id, le nom, le quartier et la cuisine qui ne se situent à Staten Island ou à Brooklyn ou dans le Bronx
db.restaurants.find(
{"borough" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},
{
"restaurant_id" : 1,
"name":1,"borough":1,
"cuisine" :1
}
);

// 19. Retourner l'id, le nom, le quartier et la cuisine qui ne se situent ni à Staten Island, ni à Brooklyn et ni dans le Bronx
db.restaurants.find(
{"borough" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},
{
"restaurant_id" : 1,
"name":1,"borough":1,
"cuisine" :1
}
);

// 20. Retourner l'id, le nom, le quartier et la cuisine des resraurants avec un score inférieur à 10
db.restaurants.find(
{"grades.score" : 
{ $not: 
{$gt : 10}
}
},
{
"restaurant_id" : 1,
"name":1,"borough":1,
"cuisine" :1
}
);

// 21. Retourner l'id, le nom, le quartier et la cuisine des resraurants qui ne sont ni Chinois ou Américain; ou bien dont le nom commence par "Wil"
db.restaurants.find(
{$or: [
  {name: /^Wil/}, 
  {"$and": [
       {"cuisine" : {$ne :"American "}}, 
       {"cuisine" : {$ne :"Chinees"}}
   ]}
]}
,{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1}
);

// 22. Retourner l'id, le nom et les grades des restaurants possédant une grade avec les valeurs:
//    - Une grade "A"
//    - Un score 11 s
//    - "2014-08-11T00:00:00Z"
db.restaurants.find( 
                {
                 "grades.date": ISODate("2014-08-11T00:00:00Z"), 
                 "grades.grade":"A" , 
                 "grades.score" : 11
                }, 
                {"restaurant_id" : 1,"name":1,"grades":1}
             );
    
// 23. Retourner l'id, le nom et les grades des restaurants dont 2eme élément de grades possède:
//    - Une grade "A"
//    - Un score 9
//   - Une ISODate "2014-08-11T00:00:00Z"
db.restaurants.find( 
                      { "grades.1.date": ISODate("2014-08-11T00:00:00Z"), 
                        "grades.1.grade":"A" , 
                        "grades.1.score" : 9
                      }, 
                       {"restaurant_id" : 1,"name":1,"grades":1}
                   );

// 24. Retourner l'id, le nom et la position géographique dont le deuxième élément des coordonnées géographiques contient une valeur entre 42 et 52
db.restaurants.find( 
                      { 
                        "address.coord.1": {$gt : 42, $lte : 52}
                      },
                        {"restaurant_id" : 1,"name":1,"address":1,"coord":1}
                   );

// 25. Ajoute tes 5 restaurants préférés en remplissant pour chacun :
//    - Une adresse complète
//    - Un quartier
//    - Un type de cuisine
//    - 3 notes au minimum
//    - Un nom
//    - Un id de restaurant (Pas l'_id mongo !)
db.mongocollec.insert({
    address: {
        street: "Rue de Blaye",
        zipcode: "33200"
    },
    cuisine: "HomeMade",
    grades: [
        {
            grade: "A",
            score: 3
        },
        {
            grade: "A",
            score: 4
        },
        {
            grade: "A",
            score: 6
        }
    ],
    name: "Xackos",
    restaurant_id: "5859"

})

// 26. Ajoute 2 notes à chacun de ces restaurants
db.mongocollec.update({
    restaurant_id : "5859"
}, {
    $addToSet: {
        grades: {
            $each : [
            {
                grade: "A",
                score: 85
            },
            {
                grade: "A",
                score: 15
            }]
        }
    }
}, { upsert: true})

// 27. Supprime de la base les restaurants de Staten Island
db.mongocollec.remove({
    borough : "Staten Island"
})

// 28. Transfert tous les restaurants du Manhattan à Brooklyn (Pour info, appelle ça la gentrification)
db.mongocollec.updateMany({
    borough : "Manhattan"
}, {
    $set : {
        borough : "Brooklyn"
    }
})

// 29. Retourne la liste de tous les quartiers de la collection (Si tu as encore des restaurants dans Manhattan, retourne à la question 28 )

//30. Retourner la liste des restaurants qui font soit de la cuisine chinoise, irlandaise, japonaise,
//indienne, américaine ou des hamburgers, avec les infis suivantes: :
//    - Nom du restaurant
//    - Nom du quartier / New York (exemple: Bronx / New York)
//    - Restaurant_id multiplié par 100
db.mongocollec('restaurants').aggregate([
    {
        $match: {
            $or: [
              {cuisine: 'Chinese'},
              {cuisine: 'Irish'},
              {cuisine: 'Japanese'},
              {cuisine: 'India'},
              {cuisine: 'American '},
              {cuisine: 'Hamburgers'}
             ]
        }
    }, 
    {
        $project: {
            _id : 0,
            name : 1,
            borough: { $concat: ['$borough',' / ', 'New York'] },
            restaurant_id: {
                $multiply: [ {
                    $toInt: '$restaurant_id'
                }, 100]
            }
        }
    }
])

//31. Retourner le nombre de restaurants par quartier
db.mongocollec.aggregate([{$group: {_id: {borough: '$borough'}, count: {$sum: 1}}}])
//32. Retourner le nombre de restaurants par quartier et par type de cuisine
db.mongocollec.aggregate([{$group: {_id: {borough: '$borough', cuisine: '$cuisine'}, Count: {$sum: 1}}}])
