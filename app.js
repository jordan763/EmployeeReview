const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = []
const id = []

function review() {

  function managerPrompt() {
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager's office number?",
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      team.push(manager);
      id.push(answers.managerId);
      teamPrompt();
    });
  }

  function teamPrompt() {

    inquirer.prompt([
      {
        type: "list",
        name: "team",
        message: "Which type of Employee would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "Done?"
        ]
      }
    ]).then(pick => {
      switch(pick.team) {
      case "Engineer":
        engineerPrompt();
        break;
      case "Intern":
        internPrompt();
        break;
      default:
        teamHtml();
      }
    });
  }

  function engineerPrompt() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      team.push(engineer);
      id.push(answers.engineerId);
      teamPrompt();
    });
  }

  function internPrompt() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's school?",
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      team.push(intern);
      id.push(answers.internId);
      teamPrompt();
    });
  }

  function teamHtml() {
    fs.writeFileSync(outputPath, render(team));
  }

  managerPrompt();

}


review();