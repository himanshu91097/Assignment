const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/salesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const saleSchema = new mongoose.Schema({
  date: Date,
  store: String,
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }]
});

const Sale = mongoose.model('Sale', saleSchema);

async function insertData() {
  await Sale.insertMany([
    {
      date: new Date("2024-06-15T00:00:00Z"),
      store: "Store A",
      items: [
        { name: "item1", quantity: 5, price: 10.0 },
        { name: "item2", quantity: 3, price: 20.0 }
      ]
    },
    {
      date: new Date("2024-06-16T00:00:00Z"),
      store: "Store B",
      items: [
        { name: "item3", quantity: 2, price: 15.0 },
        { name: "item4", quantity: 1, price: 30.0 }
      ]
    }
  ]);
  console.log('Data inserted');
}

async function runAggregation() {
  const result = await Sale.aggregate([
    { "$unwind": "$items" },
    {
      "$group": {
        "_id": {
          "store": "$store",
          "month": { "$dateToString": { "format": "%Y-%m", "date": "$date" } }
        },
        "totalRevenue": { "$sum": { "$multiply": ["$items.quantity", "$items.price"] } },
        "averagePrice": { "$avg": "$items.price" }
      }
    },
    {
      "$project": {
        "_id": 0,
        "store": "$_id.store",
        "month": "$_id.month",
        "totalRevenue": 1,
        "averagePrice": 1
      }
    },
    { "$sort": { "store": 1, "month": 1 } }
  ]);

  console.log(JSON.stringify(result, null, 2));
}
runAggregation().then(() => mongoose.connection.close());
