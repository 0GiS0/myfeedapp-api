//src/resolvers/Subscription.js
const PRODUCT_ADDED = 'PRODUCT_ADDED';

const newProduct = {
    subscribe: (parent, args, context, info) => context.pubsub.asyncIterator(PRODUCT_ADDED)
}

module.exports = {
    newProduct
}