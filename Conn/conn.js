const mongoose = require("mongoose");

const Database = async () => {
  try {
    await mongoose.connect(
      "mongodb://mahnoorsarfraz23:todo123@ac-bp17jym-shard-00-00.fwf0zkp.mongodb.net:27017,ac-bp17jym-shard-00-01.fwf0zkp.mongodb.net:27017,ac-bp17jym-shard-00-02.fwf0zkp.mongodb.net:27017/?ssl=true&replicaSet=atlas-r3opgh-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.log("Not connected ❌", error.message);
  }
};

Database();

module.exports = Database;