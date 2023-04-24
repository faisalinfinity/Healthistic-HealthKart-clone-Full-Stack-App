const { productModel } = require("../models/productModel");

const AddProduct = async (req, res) => {
  try {
    let newProduct = new productModel({
      adminId: req.body.userId,
      ...req.body,
    });
    await newProduct.save();
    res.json(req.body);
  } catch (error) {
    res.send({ msg: error.message });
  }
};

const GetProduct = async (req, res) => {
  const category = req?.query?.category;
  const searchQuery = req.query?.q;
  const sortCriteria = req.query?.sort;
  const filterCriteria = req.query?.filter;
  const aboveRating = +req.query?.ratingabove;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  try {
    let data;

    if (category) {
      data = productModel.find({
        category: { $regex: category, $options: "i" },
      });
    } else {
      data = productModel.find();
    }

    if (sortCriteria) {
      let arr = sortCriteria.split(":"); //splitting the sortCriteria String by : and set object in the rqd format
      let obj = {};
      obj[arr[0]] = arr[1];
      data = data.sort(obj);
    }
    if (filterCriteria && Array.isArray(filterCriteria)) {
      //Checking filtetCriteria is an array or not because if single filter is passed it received as one obj instead of array
      const filterArray = filterCriteria.map((el) => {
        let arr = el.split(":");
        let obj = {};
        obj[arr[0]] = arr[1];
        obj[arr[0]] = { $regex: arr[1], $options: "i" }; //regex is handling small or caps letter

        return obj;
      });
      data = data.or(filterArray);
    } else if (filterCriteria) {
      let obj = {};
      let arr = filterCriteria.split(":");
      obj[arr[0]] = { $regex: arr[1], $options: "i" };

      data = data.or([obj]);
    }

    if (aboveRating) {
      data = data.find({ rating: { $gte: aboveRating } });
    }
    if (searchQuery) {
      data = data.or([{ title: { $regex: searchQuery, $options: "i" } }]);
    }
    //Pagination
    const total = await productModel.countDocuments(data); //Calculating all data for the given Query
    const totalPages = Math.ceil(total / limit); //Calculating totalPages
    const productData = await data.skip(skip).limit(limit).exec(); // skip the data and limit

    res.json({
      page,
      limit,
      total,
      data: productData,
      totalPages,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const GetSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await productModel.findOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findByIdAndDelete({ _id: id });
    res.send("Deleted Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  AddProduct,
  GetProduct,
  GetSingleProduct,
  DeleteProduct,
};
