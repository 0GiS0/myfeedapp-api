//src/schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
    enum TypeOfProduct{
        UltraProcessed
        WellProcessed
        RealFood
    }

    type NutritionFact{
        name: String!
        amount: Float!
    }

    type Product{
        _id: String! #It's a string because of MongoDB
        name: String!
        brand: String!
        market: [String!]!
        amount: Int!
        barcode: String
        imageUrl: String
        ingredients: [String!]!
        nutritionFacts: [NutritionFact!]!
        typeOfProduct: TypeOfProduct!
    }

    type Query {
        products(name: String): [Product!]!
        product(id: String!): Product!
        numberOfProducts(typeOfProduct: String): Int!
    }

    input NutritionFactInput{
        name: String!
        amount: Float!
    }

    type Mutation{
        createProduct(           
            name: String!,
            brand: String!,
            market: [String!]! 
            amount: Int!,
            barcode: String,
            imageUrl: String,
            ingredients: [String!]!,
            nutritionFacts: [NutritionFactInput!]!,
            typeOfProduct: TypeOfProduct
            ): Product!
        
        editProduct(
            _id: String!, 
            name: String,
            brand: String,
            market: [String],
            amount: Int,
            barcode: String,
            imageUrl: String,
            ingredients:  [String],
            typeOfProduct: TypeOfProduct,
            nutritionFacts: [NutritionFactInput]
        ): Product

        deleteProduct(_id: String!) : Boolean
    }

    type Subscription{
        newProduct: Product!
    }
`;

module.exports = typeDefs;