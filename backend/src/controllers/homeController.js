import express from "express";
import db from '../models/index';
import CRUDServices from '../services/CRUDServices';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

};

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
};

let postCRUD = async (req, res) => {
    await CRUDServices.createNewUser(req.body);
    return res.redirect('/get-crud');
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUsers();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('Users not found!')
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDServices.updateUserData(data);
    return res.redirect('/get-crud')
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id);
        return res.redirect('/get-crud')
    } else {
        return res.send('Users not found')
    }

};

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}