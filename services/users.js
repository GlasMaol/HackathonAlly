import {database} from '../server.js'


// Lägg till ny user
async function createUser(user) {
    try {
        const newUser = await database.insert(user);
        console.log(newUser);
    } catch(error) {
        console.error(error);
    }
}

// Hämta alla users
async function getAllUsers() {
    try {
        const users = await database.find({});
        return users
    } catch (error) {
        console.error(error);
    }
}

// Hämta specefik user
async function getUserById(id) {
    return await database.findOne({ _id : id})
}

// Uppdatera user
async function updateUser(id, updatedUser) {
    const user = await database.findOne({ _id : id })
    return await database.update({ _id : id}, { $set : updatedUser })
}

// Ta bort user
async function deleteUser(id) {
    const deletedUser = await database.remove({ _id : id })
    console.log(deletedUser);
}

export {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}