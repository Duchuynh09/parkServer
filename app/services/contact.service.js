const { ObjectId } = require("mongodb");
class ContactService {
  constructor(client, collection) {
    this.Contact = client.db("Contact").collection(collection);
  }

  async updateArea(id, payload) {
    const filter = {
      _id: id,
    };
    const Area = await this.Contact.findOne(filter);
    const update = this.extractConactAreaData(payload, Area.park);
    const result = await this.Contact.findOneAndUpdate(
      filter,
      { $set: { park: update } },
      { returnDocument: "after" }
    );

    return result.value;
  }
  // ==============user====================
  extractConactData(payload) {
    const contact = {
      name: payload.name,
      address: payload.address,
      phone: payload.phone,
      email: payload.email,
      password: payload.password,
    };
    // Remove undefined fields
    Object.keys(contact).forEach((key) => {
      contact[key] === undefined && delete contact[key];
    });
    return contact;
  }
  // ==============Area ====================
  extractConactAreaData(payload, parks) {
    parks.forEach((e) => {
      if (payload._id == e._id) {
        e.user = payload.user;
        e.rented = payload.rented;
      }
    });
    return parks;
  }
  async create(payload) {
    const contact = this.extractConactData(payload);
    try {
      const result = await this.Contact.findOneAndUpdate(
        contact,
        { $set: { _id: new ObjectId() } },
        { returnDocument: "after", upsert: true }
      );
      return result.value;
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id) {
    return await this.Contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async find(filter) {
    const cursor = await this.Contact.find(filter);
    return await cursor.toArray();
  }
}
module.exports = ContactService;
