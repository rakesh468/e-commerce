const Products = require("../models/productModel");

//filter,sorting and pagination//

class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString=request.query//

    const excludedFields = ["page", "sort", "limit"];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  getProducts: async (request, response) => {
    try {
      const features = new APIfeature(Products.find(), request.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      response.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (request, response) => {
    try {
      const {
        product_id,
        title,
        description,
        content,
        category,
        images,
        price,
      } = request.body;
      if (!images)
        return response.status(400).json({ msg: "No images upload" });
      const product = await Products.findOne({ product_id });
      if (product)
        return response
          .status(400)
          .json({ msg: "This product already Exists" });

      const newProduct = new Products({
        product_id,
        price,
        content,
        description,
        title: title.toLowerCase(),
        category,
        images,
      });
      await newProduct.save();
      response.json({ msg: "Created Product Successfully" });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (request, response) => {
    try {
      await Products.findByIdAndDelete(request.params.id);
      response.json({ msg: "Deleted A Product" });
    } catch (error) {
      return response.status(500).send({ msg: error.message });
    }
  },
  updateproduct: async (request, response) => {
    try {
      const { title, price, description, content, images, category } =
        request.body;
      if (!images) return response.status(400).json({ msg: "No image found" });
      await Products.findOneAndUpdate(
        { _id: request.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      response.json({ msg: "Updated product successfully" });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
