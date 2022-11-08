module.exports = {
    mutipleMongoosetoObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongoosetoObject: function (mongo) {
        return mongo.toObject()
    }
}