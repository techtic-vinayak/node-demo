const fs = require('fs');
const Util = require('../util')
const util = new Util();
const data = [{'id': 1,'name': 'test','age': 24}, {'id': 2,'name': 'test1','age': 25}, {'id': 3,'name': 'vinayak pandya','age': 27}];

async function userSearch(searchfield){
    if (searchfield) {
        return data.filter((item)=>{
            return searchfield.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
        })
    } else {
        return data
    }
}

class UserController {
    static async userList(req, res) {
        try {
            fs.writeFile('test.json',JSON.stringify(data), 'utf8',  function (err) {
                if (err) throw err;
                console.log('Replaced!');
                }); 
            let searchData = await userSearch(req.query.search)
            if (searchData.length == 0) {
                util.setSuccess(200, "User Not found");
                } 
            else {
                util.setSuccess(200, "All user get successfully", searchData);
            }
        } catch (error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }

    static async insertUser(req, res) {
        try {
            if (!(req.body.name && req.body.age)) {
                util.setError(400,'Please provide name and age');
                return util.send(res);
            }
            let itemIds = data.map(item => item.id);
            let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
            let newItem = {
                'id': newId,
                'name': req.body.name,
                'age': req.body.age
            }
            data.push(newItem)
            util.setSuccess(200, "User added successfully", newItem);
        } catch (error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }

    static async updateUser(req, res) {
        try {
            let found = data.find(function (item) {
                return item.id === parseInt(req.params.id);
            });
            if (found) {
                if (!(req.body.name && req.body.age)) {
                    util.setError(400,'Please provide name and age');
                    return util.send(res);
                }
                let updated = {
                    id: found.id,
                    name: req.body.name,
                    age: req.body.age,
                };
                let targetIndex = data.indexOf(found);
                data.splice(targetIndex, 1, updated);
                util.setSuccess(200, "User updated successfully", updated);
            } else {
                util.setError(400, 'User Not Found');
            }
        } catch (error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }

    static async deleteUser(req,res){
        try {
            let found = data.find(function (item) {
                return item.id === parseInt(req.params.id);
            });
            if (found) {
                let targetIndex = data.indexOf(found);
                data.splice(targetIndex, 1);
                util.setSuccess(200, "User deleted successfully", found);
            } else {
                util.setError(400, 'User Not Found');
            }
        } catch(error) {
            util.setError(500, error.message);
        }
        return util.send(res);
    }

    static async getUser(req,res) {
        try{
            let found = data.find(function (item) {
                return item.id === parseInt(req.params.id);
            });
            if (found) {
                util.setSuccess(200, "User get successfully", found);
            } else {
                util.setError(400, 'User Not Found');
            }
        }catch(error){
            util.setError(500, error.message);
        }
        return util.send(res);
    }

    static async uploadFile(req, res) {
        try {
            console.log("user body!",req.body)
            console.log("files-",req.files);
            util.setSuccess(200, "Successfully uploaded files!",req.files);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async uploadProfile(req, res) {
        try {
            console.log("user body!",req.body)
            console.log("file-",req.file);
            util.setSuccess(200, "Successfully uploaded files!",req.file);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}
module.exports = UserController;