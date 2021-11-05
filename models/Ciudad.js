const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  descripcion: { type: String, required: true },
  urlFoto: { type: String, required: true },

});

const Article = mongoose.model("ciudad", articleSchema);
module.exports = Article;




