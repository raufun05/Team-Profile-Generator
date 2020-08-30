const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync =util.promisify(fs.writeFile)

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const questions = [
    {name: "name", message: "What is your manager's name?"},
    {name: "id", message: "What is the manager's id?"},
    {name: "email", message: "What is the manager's email?"},
    {
        type: 'list',
        name: 'role',
        message: " Select employees",
        choices: ['Manager', 'Engineer', 'Intern']
    }
]
const questionForManager = [
    {name: "officeNumber", message: "What is the manager's office number?"}
]
const questionForEngineer = [
    {name: "github", message: "What is the engineer's github user name?"}
]
const questionForIntern = [
    {name: "school", message: "What is the intern's school name?"}
]

const confirm = [
    {
        type: "confirm",
        name: "adding",
        message: "Do you want to input more employee information?"
    }  
]

const init = async () => {
    const employees = [];
    let addMore = true;

    while (addMore){
        const {name, id, email, role} = await inquirer.prompt(questions);
        if (role === "Manager"){
            const {officeNumber}= await inquirer.prompt(questionForManager);
            employees.push (new Manager (name, id, email, officeNumber));
        }else if (role === "Engineer"){
            const {github}= await inquirer.prompt(questionForEngineer);
            employees.push (new Engineer (name, id, email, github));
        }else{
            const {school}= await inquirer.prompt(questionForIntern);
            employees.push (new Intern (name, id, email, school));
        }
        const {adding}= await inquirer.prompt(confirm);
        addMore= adding;
    }

    const html = render(employees);

    if (!fs.existsSync(outputPath)){
        const error = await mkdirAsync(OUTPUT_DIR);
        error && console.error(error);
    }
    const error = await writeFileAsync(outputPath, html);
    error && console.error(error);
}
init();







// const teamMember = [];
// function app(){
//     function getManager(){
//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "managerName",
//                 message: "What is your Manager's name?"
//             },
//             {
//                 type: "input",
//                 name: "managerId",
//                 message: "What is Manager's Id?"
//             },
//             {
//                 type: "input",
//                 name: "managerEmail",
//                 message: "What is Manager's email?"
//             },
//             {
//                 type: "input",
//                 name: "officeNumber",
//                 message: "Enter an office number"
//             }

//         ]).then(response => {
//             const manager= new Manager(response.managerName, response.managerId, response.managerEmail, response.officeNumber);
//             teamMember.push(manager);
//             addingNewMember();
//         })
//     }
//     function getEngineer(){
//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "engineerName",
//                 message: "What is your Engineer's name?"
//             },
//             {
//                 type: "input",
//                 name: "engineerId",
//                 message: "What is Engineer's Id?"
//             },
//             {
//                 type: "input",
//                 name: "engineerEmail",
//                 message: "What is Engineer's email?"
//             },
//             {
//                 type: "input",
//                 name: "github",
//                 message: "Enter github user name"
//             }
//         ]).then(response =>{
//             const engineer= new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github);
//             teamMember.push(engineer);
//             addingNewMember();
//         })
//     }
//     function getIntern(){
//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "internName",
//                 message: "What is your Intern's name?"
//             },
//             {
//                 type: "input",
//                 name: "internId",
//                 message: "What is Intern's Id?"
//             },
//             {
//                 type: "input",
//                 name: "internEmail",
//                 message: "What is Intern's email?"
//             },
//             {
//                 type: "input",
//                 name: "school",
//                 message: "Enter school name"
//             }
//         ]).then(response =>{
//             const intern= new Intern(response.internName, response.internId, response.internEmail, response.school);
//             teamMember.push(intern);
//             addingNewMember();
//         })
//     }
//     function addingNewMember(){
//         inquirer.prompt([
//             {
//                 type: "checkbox",
//                 name: "selectemployees",
//                 message: "Which employee?",
//                 choices:[
//                     "manager",
//                     "engineer",
//                     "intern", 
//                     "done"               
//                 ]
//             }
//         ]).then(response =>{
//             const role = response.selectemployees;
//             if(role == "manager"){
//                 getManager();
//             }else if (role == "engineer"){
//                 getEngineer();
//             }else if(role == "intern"){
//                 getIntern();
//             }else if (role= "done"){
//                 renderTeam();
//             }
//         });
//     }
//     addingNewMember();
// }
// function renderTeam(){
//     fs.writeFileSync(outputPath, render(teamMember), "utf-8");
// }
// app();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
// var teamList = [];
// const managerQuestions = [
//     {
//         type: "input",
//         name: "name",
//         message: "Enter manager name:",
//         validate: async (input) => {
//             if (input == "" || /\s/.test(input)) {
//                 return "Please enter first or last name.";
//             }
//             return true;
//         }
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "Enter manager's email:",
//         validate: async (input) => {
//             if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
//                 return true;
//             }
//             return "Please enter a valid email address.";
//         }
//     },
//     {
//         type: "input",
//         name: "officeNum",
//         message: "Enter office number:",
//         validate: async (input) => {
//             if (isNaN(input)) {
//                 return "Please enter a number";
//             }
//             return true;
//         }
//     },
//     {
//         type: "list",
//         name: "hasTeam",
//         message: "Do you have any team members?",
//         choices: ["Yes", "No"]
//     }
// ]

// const employeeQuestions = [
//     {
//         type: "input",
//         name: "name",
//         message: "Enter employee name:",
//         validate: async (input) => {
//             if (input == "") {
//                 return "Please enter a name.";
//             }
//             return true;
//         }
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "Enter their email:",
//         validate: async (input) => {
//             if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
//                 return true;
//             }
//             return "Please enter a valid email address.";
//         }
//     },
//     {
//         type: "list",
//         name: "role",
//         message: "What is their role?",
//         choices: ["engineer", "intern"]
//     },
//     {
//         when: input => {
//             return input.role == "engineer"
//         },
//         type: "input",
//         name: "github",
//         message: "Engineer, enter your github username:",
//         validate: async (input) => {
//             if (input == "" || /\s/.test(input)) {
//                 return "Please enter a valid GitHub username";
//             }
//             return true;
//         }
//     },
//     {
//         when: input => {
//             return input.role == "intern"
//         },
//         type: "input",
//         name: "school",
//         message: "Intern, enter your school name:",
//         validate: async (input) => {
//             if (input == "") {
//                 return "Please enter a name.";
//             }
//             return true;
//         }
//     },
//     {
//         type: "list",
//         name: "addAnother",
//         message: "Add another team member?",
//         choices: ["Yes", "No"]
//     }
// ]

// function buildTeamList() {
//     inquirer.prompt(employeeQuestions).then(employeeInfo => {
//         if (employeeInfo.role == "engineer") {
//             var newMember = new Engineer(employeeInfo.name, teamList.length + 1, employeeInfo.email, employeeInfo.github);
//         } else {
//             var newMember = new Intern(employeeInfo.name, teamList.length + 1, employeeInfo.email, employeeInfo.school);
//         }
//         teamList.push(newMember);
//         if (employeeInfo.addAnother === "Yes") {
//             console.log(" ");
//             buildTeamList();
//         } else {
//             buildHtmlPage();
//         }
//     })
// }

// function buildHtmlPage() {
//     let newFile = fs.readFileSync("./templates/main.html")
//     fs.writeFileSync("./output/team.html", newFile, function (err) {
//         if (err) throw err;
//     })

//     console.log("Base page generated!");

//     for (member of teamList) {
//         if (member.getRole() == "Manager") {
//             buildHtmlCard("manager", member.getName(), member.getId(), member.getEmail(), "Office: " + member.getOfficeNumber());
//         } else if (member.getRole() == "Engineer") {
//             buildHtmlCard("engineer", member.getName(), member.getId(), member.getEmail(), "Github: " + member.getGithub());
//         } else if (member.getRole() == "Intern") {
//             buildHtmlCard("intern", member.getName(), member.getId(), member.getEmail(), "School: " + member.getSchool());
//         }
//     }
//     fs.appendFileSync("./output/team.html", "</div></main></body></html>", function (err) {
//         if (err) throw err;
//     });
//     console.log("Page tags closed! Operation completed.")

// }

// function buildHtmlCard(memberType, name, id, email, propertyValue) {
//     let data = fs.readFileSync(`./templates/${memberType}.html`, 'utf8')
//     data = data.replace("nameHere", name);
//     data = data.replace("idHere", `ID: ${id}`);
//     data = data.replace("emailHere", `Email: <a href="mailto:${email}">${email}</a>`);
//     data = data.replace("propertyHere", propertyValue);
//     fs.appendFileSync("./output/team.html", data, err => { if (err) throw err; })
//     console.log("Card appended");
// }

// function init() {
//     inquirer.prompt(managerQuestions).then(managerInfo => {
//         let teamManager = new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.officeNum);
//         teamList.push(teamManager);
//         console.log(" ");
//         if (managerInfo.hasTeam === "Yes") {
//             buildTeamList();    
//         } else {
//             buildHtmlPage();
//         }
//     })
// }

// init();