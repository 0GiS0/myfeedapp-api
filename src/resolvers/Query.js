//src/resolvers/Query.js
import { ObjectId } from 'mongodb';

const products = async (parent, args, { Products }, info) => {
    if (args.name) {
        return await Products.find({ name: new RegExp(args.name, 'i') }).toArray();
    }

    return (await Products.find().toArray());
}

const product = async (parent, args, { Products }, info) => {
    return await Products.findOne({ _id: ObjectId(args.id) });
}

const numberOfProducts = async (parent, args, { Products }, info) => {

    if (args.typeOfProduct)
        return (Products.find({ typeOfProduct: args.typeOfProduct })).count();

    return await Products.count();
}

module.exports = {
    products,
    product,
    numberOfProducts
}