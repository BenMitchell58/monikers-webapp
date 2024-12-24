export const dividePlayersIntoTeams = (numPlayers) => {
    const teams = [[], []];
    for (let i = 0; i < numPlayers; i++) {
        teams[i % 2].push(`Player ${i + 1}`);
    }
    return teams;
};