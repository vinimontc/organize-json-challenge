const fs = require('fs');

const containsCountry = (array, country) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].country == country) {
      return array[i];
    }
  }
  return null;
};

const containsStatus = (array, status) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].status == status) {
      return array[i];
    }
  }
  return null;
};

const stats = data => {
  let list = [],
    resp;
  for (let i = 0; i < data.length; i++) {
    resp = containsStatus(list, data[i].status);
    if (resp == null) {
      list.push({
        status: data[i].status,
        orders: data[i].order_items.length
      });
    } else {
      resp.orders += data[i].order_items.length;
    }
  }
  return list;
};

const organize = data => {
  let list = [],
    resp;
  for (let i = 0; i < data.length; i++) {
    resp = containsStatus(list, data[i].status);
    if (resp == null) {
      list.push({
        status: data[i].status,
        orders: [data[i]]
      });
    } else {
      resp.orders.push(data[i]);
    }
  }
  return list;
};

const organizeByCountry = data => {
  let list = [],
    resp;
  for (let i = 0; i < data.length; i++) {
    list = [];
    for (let j = 0; j < Object.keys(data[i].orders).length; j++) {
      resp = containsCountry(list, data[i].orders[j].shipping.country.name);
      if (resp == null) {
        list.push({
          country: data[i].orders[j].shipping.country.name,
          orders: [data[i].orders[j]]
        });
      } else {
        resp.orders.push(data[i].orders[j]);
      }
    }
    data[i].orders = list;
  }

  return data;
};

class Main {
  listByStatus(req, res) {
    let raw = fs.readFileSync('src/assets/chaotic_data.json');
    let data = JSON.parse(raw);

    const content = organize(data);
    return res.json(content);
  }

  showCount(req, res) {
    let raw = fs.readFileSync('src/assets/chaotic_data.json');
    let data = JSON.parse(raw);
    const status = req.params.status;

    const count = stats(data);

    for (let i = 0; i < count.length; i++) {
      if (status == count[i].status) {
        return res.json(content[i]);
      }
    }

    return res.status(404).json({ error: 'orders not founded' });
  }

  majorOrder(req, res) {
    let raw = fs.readFileSync('src/assets/chaotic_data.json');
    let data = JSON.parse(raw);

    const content = stats(data);

    const majorValues = content.sort(function(a, b) {
      return a.orders < b.orders ? 1 : a.orders > b.orders ? -1 : 0;
    });

    return res.json(majorValues);
  }

  orderByCountry(req, res) {
    let raw = fs.readFileSync('src/assets/chaotic_data.json');
    let data = JSON.parse(raw);

    const list = organize(data);
    const listByCountry = organizeByCountry(list);

    return res.json(listByCountry);
  }
}

module.exports = new Main();
