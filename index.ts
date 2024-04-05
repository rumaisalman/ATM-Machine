#! usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

let currentBalance = 10000
let pin: any = 12345

console.log(chalk.blueBright("\n \t Welcome to the ATM machine \n"))

let pinAns = await inquirer.prompt([
	{
		name: "pin",
		message: chalk.yellow("Enter your PIN"),
		type: "number"
	}
])
if (pinAns.pin === pin) {
	console.log(chalk.greenBright("You've entered the correct PIN."))
	let operationAns = await inquirer.prompt([
		{
			name: "operation",
			type: "list",
			message: chalk.yellow("Select an operation"),
			choices: ["Withdraw Amount", "Check balance"],
		}
	])


	if (operationAns.operation === "Withdraw Amount") {
		let withdrawalAns = await inquirer.prompt([
			{
				name: "withdrawmethod",
				type: "list",
				message: chalk.yellow("Select a withdrawal method."),
				choices: ["Fast Cash", "Enter Amount"],
			}
		])

		if (withdrawalAns.withdrawmethod === "Fast Cash") {
			let fastcashAns = await inquirer.prompt([
				{
					name: "fastcash",
					type: "list",
					message: chalk.yellow("Select Amount"),
					choices: ["1000", "2000", "5000", "10,000", "50,000"],
				}
			])

			if (fastcashAns.fastcash > currentBalance) {
				console.log(chalk.redBright("Insufficient Balance"));
			}
			else {
				currentBalance -= fastcashAns.fastcash
				console.log(chalk.green(`Amount $${fastcashAns.fastcash} successfully withdrawn`));
				console.log(chalk.greenBright(`Your remaining balance is: $${currentBalance}`));
			}
		}
		else if (withdrawalAns.withdrawmethod === "Enter Amount") {
			let amountAns = await inquirer.prompt([
				{
					name: "amount",
					type: "number",
					message: chalk.yellow("Enter the amount you want to withdraw")
				}
			])
			if (amountAns.amount > currentBalance) {
				console.log(chalk.redBright("Insufficient balance"));
			}
			else {
				currentBalance -= amountAns.amount;
				console.log(chalk.greenBright(`Amount $${amountAns.amount} is successfully withdrawn`));
				console.log(chalk.greenBright(`Your remaining balance is: $${currentBalance}`));
			}
		}
	} else if (operationAns.operation === "Check balance") {
		console.log(chalk.cyanBright(`You have $${currentBalance} in your account `))
	}
} else {
	console.log(chalk.red("PIN is incorrect, Try again."))
}

console.log(chalk.magenta("ThankYou for using our ATM!"))

