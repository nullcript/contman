"use strict";

//core

//npm
const yargs = require('yargs');
const chalk = require('chalk');

//custom
const { createContact, removeContact, listContact } = require('./contact');

//variables
const titleLength = `Welcome to NodeJs 'Contact Manager'`.length;


// --------------------------------------------------------------------------------


//title text
console.log(chalk.green(`\n\tnc${"-".repeat(titleLength - 3)}>`));
console.log(`${chalk.green(`\tWelcome to NodeJs ${chalk.bold("'Contact Manager'")}`)}`);
console.log(chalk.green(`\t<${"-".repeat(titleLength)}\n`));


//------------------| CREATE Command [c]
yargs.command({
    command: "create",
    aliases: ["c"],
    describe: "[Create new contact]",
    builder: {
        username: {
            describe: "[username]",
            type: "string",
            demandOption: true,
            alias: "u"
        },
        phoneNumber: {
            describe: "[phoneNumber]",
            type: "string",
            demandOption: true,
            alias: "p"
        }
    },
    handler({ username, phoneNumber }) {
        console.log(chalk.bold.italic.yellow(" your operation was : "), chalk.green("CREATE"), "\n");
        createContact(username, phoneNumber);
    }
});


//------------------| REMOVE Command [r]
yargs.command({
    command: "remove",
    aliases: ["r"],
    describe: "[Remove a contact]",
    builder: {
        username: {
            describe: "[username]",
            type: "string",
            demandOption: true,
            alias: "u"
        }
    },
    handler({ username }) {
        console.log(chalk.bold.italic.yellow(" your operation was : "), chalk.green("REMOVE"), "\n");
        removeContact(username);
    }
});


//------------------| LIST Command [l]
yargs.command({
    command: "list",
    aliases: ["l"],
    describe: "[List all contacts]",

    handler() {
        console.log(chalk.bold.italic.yellow(" your operation was : "), chalk.green("LIST"), "\n");
        listContact();
    }
});

//------------------| Info Command [i]
yargs.command({
    command: "info",
    aliases: ["i"],
    describe: "[Information about application]",

    handler() {
        console.log(chalk.bold.italic.yellow(" your operation was : "), chalk.green("INFO"), "\n");
        console.log(` You can do these operations in this application : `);
        console.log(`
${chalk.yellow(" CREATE")} : [Create new contact]
${chalk.yellow(" REMOVE")} : [Remove a contact]
${chalk.yellow(" LIST")}   : [List all contacts]
${chalk.yellow(" INFO")}   : [Information about application 'THIS']
`);

        console.log(`${chalk.italic.bold.red(" Note : ")} All informations saved local as a ${chalk.yellow(".json")} file
 in you computer [${chalk.yellow("'./DataBase/contacts.json'")}]\n`);

    }
});

yargs.parse();
