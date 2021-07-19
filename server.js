const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./env-config");
const chefRoutes = require("./api/chef/chef.routes");
const dishRoutes = require("./api/dish/dish.routes");
const restaurantRoutes = require("./api/restaurant/restaurant.routes");
const RestaurantModel = require("./models/RestaurantModel");
const DishModel = require("./models/DishModel");
const ChefModel = require("./models/ChefModel");
const makeObjectId = mongoose.Types.ObjectId;

app.use(express.json());
app.use(cors());

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.dbURL, mongooseOptions, (err) => {
  if (err) {
    throw new Error("Failed connection to mongoDB with error: ", err);
  } else {
    console.log("Connected successfully to mongoDB!");
  }
});

app.use("/api/chef", chefRoutes);
app.use("/api/dish", dishRoutes);
app.use("/api/restaurant", restaurantRoutes);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

// app.use("/seed", (req, res) => {
//   const restaurants = [
//     {
//       imgUrl: "../../../assets/img/claro.jpg",
//       name: "Claro",
//     },
//     {
//       imgUrl: "../../../assets/img/mizlala-gret-mullet-fillet.jpg",
//       name: "Lumina",
//     },
//     {
//       imgUrl: "../../../assets/img/tiger-lili.jpg",
//       name: "Tiger Lilly",
//     },
//     {
//       imgUrl: "../../../assets/img/onza.jpg",
//       name: "Onza",
//     },
//     {
//       imgUrl: "../../../assets/img/kitchen-market.jpg",
//       name: "Kitchen Market",
//     },
//     {
//       imgUrl: "../../../assets/img/mashya.jpg",
//       name: "Mashya",
//     },
//   ];

//   const dishes = [
//     {
//       imgUrl: "../../../assets/img/pad-ki-mao.jpg",
//       name: "Pad Ki Mao",
//       ingredients:
//         "Shrimps, Glass Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic Chili Brown Coconut",
//       price: 88,
//       types: ["spicy"],
//     },
//     {
//       imgUrl: "../../../assets/img/kab-kem.jpg",
//       name: "Garbanzo Frito",
//       ingredients:
//         "Polenta fingers, veal cheek, magic chili cured lemon cream, yellow laksa",
//       price: 98,
//       types: [],
//     },
//     {
//       imgUrl: "../../../assets/img/popina.jpg",
//       name: "Smoked Pizza",
//       ingredients: 'Basil dough, cashew "butter", demi-glace, bison & radish',
//       price: 65,
//       types: ["vegan"],
//     },
//   ];

//   const chefs = [
//     {
//       name: "Ran Shmueli",
//       imgUrl: "",
//     },
//     {
//       name: "Meir Adoni",
//       imgUrl: "",
//     },
//     {
//       name: "Yanir Green",
//       imgUrl: "",
//     },
//     {
//       name: "Yossi Shitrit",
//       imgUrl: "../../../assets/img/yossi.jpg",
//     },
//   ];
//   Promise.all([RestaurantModel.find(), DishModel.find(), ChefModel.find()])
//   .then(([restaurants, dishes, chefs]) => {
//     restaurants.forEach((rest) => {
//       let foundchef;
//       if (
//         // rest.name === "Onza" 
//         // rest.name === "Kitchen Market"
//         rest.name === "Mashya"
//       ) {
//         foundchef = chefs.find((chef) => chef.name === "Yossi Shitrit");
//         console.log(foundchef);
//         rest.chef = makeObjectId(foundchef._id);
//         foundchef.restaurants.push(makeObjectId(rest._id));
//         const newrest = new RestaurantModel(rest);
//         const newchef = new ChefModel(foundchef);

//         console.log(newrest);
//         newrest.save(newrest, (err) => {
//           console.log({ newrest });
//         });
//         newchef.save(newchef, (err) => {
//           console.log({ newchef });
//         });
//         res.send("coooollllllll");
//       }
//       // if (rest.name === "Garbanzo Frito") {
//       //   foundRest = restaurants.find((rest) => rest.name === "Kab Kem");
//       // }
//       // if (rest.name === "Smoked Pizza") {
//       //   foundRest = restaurants.find((rest) => rest.name === "Popina");
//       // }
//     });
//   })
//   .catch((err) => {
//     res.status(422).send(err);
//   });
// });
