"use strict";

//core
const fs = require('fs/promises');

//npm
const chalk = require('chalk');

//custom

async function fetchDataFromDB() {
    try {
        let contactsJson = await fs.readFile("./DataBase/contacts.json", "utf8");
        if (contactsJson === "") return [];
        return JSON.parse(contactsJson);
    } catch (error) {
        console.log(chalk.red("fetchDataFromDB error"));
        return [];
    }
};

async function saveDataToDB(contact) {
    try {
        await fs.writeFile("./DataBase/contacts.json", JSON.stringify(contact, null, 4));
    } catch (error) {
        console.log("saveDataToDB error");
    }
}



//---------------------------| CREATE Function
async function create(username, phoneNumber) {

    let contactsArray = await fetchDataFromDB();
    let newContact = { username, phoneNumber };
    let isDuplicate = contactsArray.find(v => v.username === username && v.phoneNumber === phoneNumber);

    if (!isDuplicate) {
        contactsArray.push(newContact);
        await saveDataToDB(contactsArray);
        console.log(chalk.green("new contact created successfully"));

    } else {
        console.log(chalk.yellow("new contact already exist"));
    }
}

//---------------------------| REMOVE Function
async function remove(username) {

    let contactsArray = await fetchDataFromDB();
    let filterdContact = contactsArray.filter(v => v.username !== username);

    if (filterdContact.length !== contactsArray.length) {
        await saveDataToDB(filterdContact);
        console.log(chalk.green(`${username} removed successfully`));

    } else {
        console.log(chalk.yellow("contact doesn't exist"));
    }
}

//---------------------------| LIST Function
async function list() {

    let contactsArray = await fetchDataFromDB();

    console.log(`Contacts Are : `);
    console.table(contactsArray);
}


//exports

module.exports = {
    createContact: create,
    removeContact: remove,
    listContact: list
}