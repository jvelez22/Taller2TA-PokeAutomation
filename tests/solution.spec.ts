import { test } from '@playwright/test';
import { InitialPage } from './pages/init.page';
import { TeamBuilderPage } from './pages/team-builder.page';
import { TeamBuilderSelectPokemonPage } from './pages/team-builder-select-pokemon.page';
import { TeamBuilderSelectFormatPage } from './pages/team-builder-select-format.page';
import * as pokemonData from './data/pokemonData.json';

test('Create and validate new Team', async ({ page }) => {
    test.slow()
    const homePage = new InitialPage(page)
    const teamListPage = new TeamBuilderPage(page)
    const teamCreationPage = new TeamBuilderSelectFormatPage(page)
    const pokemonDetailList = new TeamBuilderSelectPokemonPage(page)

    await homePage.navigate()
    await homePage.openTeamBuilder()
    await teamListPage.createNewTeam()
    await teamCreationPage.selectFormat(pokemonData.format, pokemonData.gen)
    for (const pokemon of pokemonData.pokemon) {
        await teamCreationPage.addPokemon(pokemon.name)

        await pokemonDetailList.setItem(pokemon.item)
        await pokemonDetailList.setAbility(pokemon.ability)
        await pokemonDetailList.setMoves(pokemon.moves)
        await pokemonDetailList.setEVStats(pokemon.evStats)
        await pokemonDetailList.verifyTotalEvCount()
        await page.screenshot({ path: `./evidences/${pokemon.name}.png` })
        await pokemonDetailList.goBackToTeam()
    }

    await page.screenshot({ path: `./evidences/team.png` })
    await teamCreationPage.validateTeam(pokemonData.format, pokemonData.gen)
});
