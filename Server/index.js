const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@back-prac-2-admin.sldkkq5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const UsersCollection = client.db("TastyTreasures").collection("Users");
    const RecipesCollection = client.db("TastyTreasures").collection("Recipes");

    // Register User (with default 50 coins)
    app.put("/registerUser", async (req, res) => {
      const user = req.body;
      user.coins = 50;
      const result = await UsersCollection.insertOne(user);
      res.send(result);
    });

    // Add Recipe
    app.post("/addRecipe", async (req, res) => {
      const recipe = req.body;
      recipe.watchCount = 0;
      recipe.purchased_by = [];
      recipe.reactions = [];
      const result = await RecipesCollection.insertOne(recipe);
      res.send(result);
    });

    // View Recipe Details
    app.get("/recipe/:id", async (req, res) => {
      const id = req.params.id;
      const userEmail = req.query.userEmail;
      const query = { _id: new ObjectId(id) };
      const recipe = await RecipesCollection.findOne(query);

      if (!recipe) {
        return res.status(404).send({ message: "Recipe not found" });
      }

      const userQuery = { email: userEmail };
      const user = await UsersCollection.findOne(userQuery);

      if (!user) {
        return res.status(401).send({ message: "User not logged in" });
      }

      if (user.email === recipe.creatorEmail) {
        return res.send({ redirect: "recipeDetails", recipe });
      }

      if (user.coins < 10) {
        return res.send({
          redirect: "purchaseCoins",
          message: "Not enough coins",
        });
      }

      if (recipe.purchased_by.includes(userEmail)) {
        return res.send({ redirect: "recipeDetails", recipe });
      }

      user.coins -= 10;
      await UsersCollection.updateOne(userQuery, {
        $set: { coins: user.coins },
      });
      await UsersCollection.updateOne(
        { email: recipe.creatorEmail },
        { $inc: { coins: 1 } }
      );
      recipe.purchased_by.push(userEmail);
      recipe.watchCount += 1;
      await RecipesCollection.updateOne(query, { $set: recipe });

      res.send({ redirect: "recipeDetails", recipe });
    });

    // Purchase Coins
    app.post("/purchaseCoins", async (req, res) => {
      const { email, amount } = req.body;
      const query = { email: email };
      const user = await UsersCollection.findOne(query);

      if (user) {
        const updatedCoins = user.coins + amount;
        await UsersCollection.updateOne(query, {
          $set: { coins: updatedCoins },
        });
        res.send({ message: "Coins purchased successfully", updatedCoins });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });

    // Reaction System
    app.patch("/recipe/react/:id", async (req, res) => {
      const id = req.params.id;
      const { email } = req.body;
      const query = { _id: new ObjectId(id) };
      const recipe = await RecipesCollection.findOne(query);

      if (!recipe) {
        return res.status(404).send({ message: "Recipe not found" });
      }

      const userReactionIndex = recipe.reactions.indexOf(email);
      if (userReactionIndex > -1) {
        recipe.reactions.splice(userReactionIndex, 1);
      } else {
        recipe.reactions.push(email);
      }

      await RecipesCollection.updateOne(query, {
        $set: { reactions: recipe.reactions },
      });
      res.send(recipe);
    });

    // Recipes
    app.get("/recipes", async (req, res) => {
      const { category, country, page = 1, pageSize = 5 } = req.query;
      const search = req.query.search || "";
      const query = {
        $or: [
          {},
          { category: category },
          { country: country },
          { title: { $regex: search, $options: "i" } },
        ],
      };

      const skip = (page - 1) * pageSize;

      const recipes = await RecipesCollection.find(query)
        .skip(skip)
        .limit(parseInt(pageSize))
        .toArray();

      res.send(recipes);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
