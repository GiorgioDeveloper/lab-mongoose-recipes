const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

mongoose.set("useCreateIndex", true); // what is this doing??

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    return Recipe.deleteMany();
  })
  .then(result => {
    return Recipe.insertMany(data);
  })

  .then(result => {
    console.log("Success", result); // how to console.log only the title??
  })

  .then(result => {
    // how to console.log the success message??
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },

      {
        duration: 100
      },
      {
        new: true
      }
    );
  })

  .then(result => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
    // how to console.log the success message??
  })

  .then(result => {
    return Recipe.create(
      {
        title: "Spaghetti alla Carbonara",
        level: "Easy Peasy",
        ingredients: [
          "Spaghetti",
          "eggs",
          "Pepper",
          "Salt",
          "Parmigiano",
          "Bacon"
        ],
        cuisine: "Italian",
        dishType: "Dish",
        image:
          "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
        duration: 40,
        creator: "Giorgio"
      },
      function(err, Recipe) {
        if (err) {
          console.log("An error happened:", err);
        } else {
          console.log("The Recipe is saved and its value is: ", Recipe);
        }
      }
    );
  })
  // .catch(err => {
  //   console.error("Error connecting to mongo", err);
  // });

  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => console.log("conn closed"))

  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
