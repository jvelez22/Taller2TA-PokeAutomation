import { Page, Locator } from "@playwright/test"
import { BUTTON_LOCATOR, POKEMON_URL } from "../constants"

const NEW_TEAM_BUILDER = 'Teambuilder';

export class InitialPage {
    readonly page: Page
    readonly teambuilderButton: Locator

    constructor(page: Page) {
        this.page = page
        this.teambuilderButton = page.getByRole(BUTTON_LOCATOR, { name: NEW_TEAM_BUILDER })
    }

    async navigate() {
        await this.page.goto(POKEMON_URL)
    }

    async openTeamBuilder() {
        await this.teambuilderButton.click();
    }
}