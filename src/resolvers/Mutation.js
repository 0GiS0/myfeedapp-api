//src/resolvers/Mutation.js
import { ObjectId } from 'mongodb';

const PRODUCT_ADDED = 'PRODUCT_ADDED';

const createProduct = async (parent, args, { db, pubsub }, info) => {

    const Products = db.collection('products');
    let result = await Products.insertOne(args);
    let newProduct = result.ops[0];

    await pubsub.publish(PRODUCT_ADDED, { newProduct });

    return newProduct;
}

const editProduct = async (parent, args, { db }, info) => {
    const Products = db.collection('products');
    const _id = args._id;
    delete args._id;
    await Products.updateOne({ "_id": ObjectId(_id) }, { $set: args });
    args._id = _id;
    return args;
}

const deleteProduct = async (parent, args, { db }, info) => {
    const Products = db.collection('products');
    try {
        Products.deleteOne({ "_id": ObjectId(args._id) });
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    createProduct,
    editProduct,
    deleteProduct
}