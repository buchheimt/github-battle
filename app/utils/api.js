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
