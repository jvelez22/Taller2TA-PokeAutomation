import { Page, Locator, expect } from '@playwright/test';
import { BODDY_LOCATOR, BUTTON_LOCATOR } from '../constants';

const SELECT_FORMAT = 'Select a format';
const SEARCH_FORMAT = 'Search formats';
const ADD_POKEMON = 'Add Pokémon';
const INPUT_POKEMON = 'input[name="pokemon"]';
const BUTTON_VALIDATE = 'button[name="validate"]';

export class TeamBuilderSelectFormatPage {
    readonly page: Page;
    readonly formatDropdownButton: Locator;
    readonly formatSearchBox: Locator;
    readonly addPokemonButton: Locator;
    readonly pokemonSearchBox: Locator;
    readonly validateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formatDropdownButton = page.getByRole(BUTTON_LOCATOR, { name: SELECT_FORMAT });
        this.formatSearchBox = page.getByPlaceholder(SEARCH_FORMAT);
        this.addPokemonButton = page.getByRole(BUTTON_LOCATOR, { name: ADD_POKEMON });
        this.pokemonSearchBox = page.locator(INPUT_POKEMON);
        this.validateButton = page.locator(BUTTON_VALIDATE)
    }

    async selectFormat(formatName: string, gen: string) {
        await this.formatDropdownButton.click();
        await this.formatSearchBox.pressSequentially(formatName, { delay: 200 });
        await this.page.locator(`button:has-text("${gen}")`).click();
    }

    async addPokemon(pokemonName: string) {
        const searchValue = await this.pokemonSearchBox.inputValue()
        await this.addPokemonButton.click();
        await this.pokemonSearchBox.click({ delay: 100});
        if (searchValue !== '') {
            await this.pokemonSearchBox.clear()
        }
        await this.pokemonSearchBox.pressSequentially(pokemonName, { delay: 100 });
        await this.page.locator(`a[data-entry="pokemon|${pokemonName}"]`).click();
    }

    async validateTeam(format: string, gen: string) {
        await this.validateButton.click();
        await expect(this.page.locator(BODDY_LOCATOR)).toContainText(`Your team is valid for [${gen}] ${format}.`);
    }
}
