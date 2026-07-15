const mongoose = require("mongoose");

const uri = "mongodb+srv://techtots:techtots2026@cluster0.jp8dzox.mongodb.net/?appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed");
    console.error(err);
    process.exit(1);
  });