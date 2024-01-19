
const { usersModel } = require("../models/userModel.js");

class userManagerDB {
    constructor(){
        this.usersModel = usersModel
    }

    async getUsers() {
        return await this.usersModel.find({})
    }

    async getUserBy(filter) {
        return await this.usersModel.findOne(filter)
    }

    async createUser(newUser) {
        return await this.usersModel.create(newUser)
    }

    async updateUser(uid, userUpdate) {
        return await this.usersModel.findOneAndUpdate({_id: uid}, userUpdate)
    }

    async deleteUser(uid) {
        return await this.usersModel.findOneAndDelete({_id: uid})
    }
}

module.exports = userManagerDB;