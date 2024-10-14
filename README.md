# Playwright Automation Project

This project automates the process of building a Pokémon team on [Pokémon Showdown](https://play.pokemonshowdown.com/) using Playwright. The automation tests ensure that the user can successfully create a team of six Pokémon and validate the team configuration.

## Project Overview

The automated workflow includes:

1. **Navigating to the Teambuilder**: Clicks the `Teambuilder` button to initiate the team-building process.
2. **Creating a New Team**: Selects the option to create a `New Team`.
3. **Selecting a Format**: Chooses the `[Gen 6] Ubers` format.
4. **Adding Pokémon to the Team**: Automates the process of selecting six Pokémon and completing the necessary details for each.
5. **Validating the Team**: After the team is complete with six Pokémon, the automation navigates back and validates the team.

## Prerequisites

Before running the tests, ensure the following are installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/en/)
- **Playwright**: Install Playwright via npm (instructions below)

## Installation

Clone this repository and install the required dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

To run the test suite, execute the following command:

```bash
npx playwright test
```

To run the tests in **headed** mode (with the browser UI visible), use:

```bash
npx playwright test --headed
```

### Running in Chromium

To run the tests only in **Chromium** browser:

```bash
npx playwright test --project=chromium
```

## Test Workflow

The automation follows these steps:

1. **Navigate to the Pokémon Showdown Website**: Opens the main Pokémon Showdown web page.
2. **Click on Teambuilder**: Clicks the `Teambuilder` button to start creating a team.
3. **Create a New Team**: Selects the `New Team` option to build a fresh team.
4. **Select the Format**: Chooses the `[Gen 6] Ubers` format from the available options.
5. **Add Pokémon**: Repeats the process of adding six different Pokémon to the team.
6. **Validate the Team**: After adding six Pokémon, the test returns to the team overview and validates the team configuration.

## Configuration

The Playwright configuration (`playwright.config.ts`) includes setup for running the tests in different browsers. You can modify this file to adjust settings like timeouts, browser selection, or headless mode.
