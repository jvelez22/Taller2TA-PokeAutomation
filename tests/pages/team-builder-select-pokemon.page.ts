import { Page, Locator, expect } from "@playwright/test";

const INPUT_SELECTOR = (value: string) => `input[name="${value}"]`;
const BUTTON_SELECTOR_WITH_NAME = (value: string) => `button[name="${value}"]`;

export class TeamBuilderSelectPokemonPage {
  readonly page: Page;
  readonly itemInput: Locator;
  readonly abilityInput: Locator;
  readonly ivSpreadDropdown: Locator;
  readonly evStatInputs: { [key: string]: Locator };
  readonly evStatPanel: Locator;
  readonly backToTeamButton: Locator;
  readonly moves: { [key: string]: Locator };
  readonly totalEv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemInput = page.locator(INPUT_SELECTOR("item"));
    this.abilityInput = page.locator(INPUT_SELECTOR("ability"));
    this.ivSpreadDropdown = page.locator('select[name="ivspread"]');
    this.moves = {
      move1: page.locator(INPUT_SELECTOR("move1")),
      move2: page.locator(INPUT_SELECTOR("move2")),
      move3: page.locator(INPUT_SELECTOR("move3")),
      move4: page.locator(INPUT_SELECTOR("move4")),
    };
    this.evStatInputs = {
      hp: page.locator(INPUT_SELECTOR("stat-hp")),
      atk: page.locator(INPUT_SELECTOR("stat-atk")),
      def: page.locator(INPUT_SELECTOR("stat-def")),
      spa: page.locator(INPUT_SELECTOR("stat-spa")),
      spd: page.locator(INPUT_SELECTOR("stat-spd")),
      spe: page.locator(INPUT_SELECTOR("stat-spe")),
    };
    this.evStatPanel = page.locator(BUTTON_SELECTOR_WITH_NAME("stats"));
    this.backToTeamButton = page.locator(BUTTON_SELECTOR_WITH_NAME("back"));
    this.totalEv = page.locator("div.totalev em");
  }

  async setItem(itemName: string) {
    const value = await this.itemInput.inputValue();
    if (value !== "") return;
    await this.itemInput.click();
    await this.itemInput.pressSequentially(itemName, { delay: 100 });
  }

  async setAbility(abilityName: string) {
    const value = await this.abilityInput.inputValue();
    if (value !== "") return;
    await this.abilityInput.click();
    await this.abilityInput.pressSequentially(abilityName, { delay: 100 });
  }

  async setMoves(moves: { [key: string]: string }) {
    for (const [move, value] of Object.entries(moves)) {
      await this.moves[move].pressSequentially(value, { delay: 100 });
    }
  }

  async setEVStats(evStats: { [key: string]: string }) {
    await this.evStatPanel.click();
    Object.entries(evStats).forEach(async ([stat, value]) => {
      await this.evStatInputs[stat].pressSequentially(value, { delay: 100 });
    });
  }

  async verifyTotalEvCount() {
    await expect(this.totalEv).toContainText("0");
  }

  async goBackToTeam() {
    await this.backToTeamButton.click();
  }
}
