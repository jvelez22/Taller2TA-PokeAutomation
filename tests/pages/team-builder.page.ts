import { Page, Locator } from '@playwright/test';
import { BUTTON_LOCATOR } from '../constants';

const NEW_TEAM_BUTTON = ' New Team';

export class TeamBuilderPage {
    readonly page: Page;
    readonly newTeamButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTeamButton = page.getByRole(BUTTON_LOCATOR, { name: NEW_TEAM_BUTTON });
    }

    async createNewTeam() {
        await this.newTeamButton.first().click();
    }
}