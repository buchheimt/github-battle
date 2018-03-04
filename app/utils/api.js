async function getProfile(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const body = await res.json();

    return body;
  } catch (e) {
    handleError(e);
  }
}

async function getRepos(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const body = await res.json();
    
    return body;
  } catch (e) {
    handleError(e);
  }
}

function getStarCount(repos) {
  return repos.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

async function getUserData(player) {
  try {
    const profile = await getProfile(player);
    const repos = await getRepos(player);

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  } catch (e) {
    handleError(e);
  }
}

function sortPlayers(players) {
  return players.sort((a,b) => b.score - a.score);
}

export async function fetchPopularRepos(lang) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);

  try {
    const res = await fetch(encodedURI);
    const body = await res.json();

    return body.items;
  } catch (err) {
    console.log('Something went wrong while fetching repos from GitHub:', err);
  }
}

export async function battle(players) {
  try {
    const playerOne = await getUserData(players[0]);
    const playerTwo = await getUserData(players[1]);

    return sortPlayers([playerOne, playerTwo]);
  } catch (e) {
    handleError(e);
  }
}