
const usersModel  = require("../models/userModel.js");
const CartManagerDB = require('./CartManagerDB.js');

const cartsService = new CartManagerDB();

class userManagerDB {

    constructor() {
        this.model = usersModel;
    }

        getUsersPaginate = async (limit=10, page=1) => await thism.model.paginate({}, {limit, page, lean: true})
        getUsers = async () => await this.model.find({})
        getUserById = async (uid) => await this.model.findOne({_id: uid})
        getUserByMail = async (uemail) => await this.model.findOne({email: uemail})
        createUser = async (newUser) => {
            newUser.cart = await cartsService.create();
            await this.model.create(newUser)
        }
        updateUser = async (uid, userUpdate) => await this.model.findOneAndUpdate({_id: uid}, userUpdate)
        deleteUser = async (uid) => await this.model.findOneAndDelete({_id: uid})
}

module.exports = userManagerDB;