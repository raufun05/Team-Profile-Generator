const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync =util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    //general questions for all employees
    {name: "name", message: "What is your employee's name?"},
    {name: "id", message: "What is the employee's id?"},
    {name: "email", message: "What is the employee's email?"},
    {
        type: 'list',
        name: 'role',
        message: " Select employees",
        choices: ['Manager', 'Engineer', 'Intern']
    },
];
const questionForManager = [
    // question for manager employee only
    {name: "officeNumber", message: "What is the manager's office number?"}
]
const questionForEngineer = [
    // question for engineer employee only
    {name: "github", message: "What is the engineer's github user name?"}
]
const questionForIntern = [
    // question for intern employee only
    {name: "school", message: "What is the intern's school name?"}
]

const confirm = [
    {
        type: "confirm",
        name: "adding",
        message: "Do you want to input more employee's information?"
    }  
]

const init = async () => {
    const employees = [];
    let addMore = true;

    while (addMore){
        // destructure name, id, email, role from answer object
        const {name, id, email, role} = await inquirer.prompt(questions);
        if (role === "Manager"){
            const {officeNumber}= await inquirer.prompt(questionForManager);
            // create a new Manager object and push to employees array
            employees.push (new Manager (name, id, email, officeNumber));
        }else if (role === "Engineer"){
            const {github}= await inquirer.prompt(questionForEngineer);
            // create a new Engineer object and push to employees array
            employees.push (new Engineer (name, id, email, github));
        }else{
            const {school}= await inquirer.prompt(questionForIntern);
            // create a new Intern object and push to employees array
            employees.push (new Intern (name, id, email, school));
        }
        //check if the user want to input more employees information
        const {adding}= await inquirer.prompt(confirm);
        addMore= adding;
    }

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
    const html = render(employees);

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.

    if (!fs.existsSync(outputPath)){
        const error = await mkdirAsync(OUTPUT_DIR);
        error && console.log(error);
    }
    const error = await writeFileAsync(outputPath, html);
    error && console.log(error);
}
init();


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
