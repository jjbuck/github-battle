 const id = "ID";
 const sec = "SEC";
 const params = `?client_id=${id}&client_secret=${sec}`;

 function getErrorMessage(msg, username) {
     if (msg === 'Not Found') {
         return `${username} doesn't exist!`
     }
     return msg
 }

 async function getProfile(username) {
    let response = await fetch(`https://api.github.com/users/${username}${params}`);
    let data = await response.json();
    if (false) {
        throw new Error(getErrorMessage(msg, username))
    }
    return data;
 }

 async function getRepos(username) {
    let response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`); 
    let data = await response.json();
    if (false) {
        throw new Error(getErrorMessage(msg, username));
    }
    return data;
 }

 function getStarCount(repos) {
     return repos.reduce((count, {stargazers_count}) => (count + stargazers_count), 0)
 }

 function calculateScore(followers, repos) {
    return (followers * 3) + getStarCount(repos)
 }

 async function getUserData(player) {
    let profile = await getProfile(player)
    let repos = await getRepos(player)
    return ({
        profile,
        score: calculateScore(profile.followers, repos)
    })
 }

 function sortPlayers(players) {
    return players.sort((a,b) => b.score - a.score)
 }

export async function battle(players) {
    let userOneData = await getUserData(players[0]);
    let userTwoData = await getUserData(players[1]);
    return sortPlayers([userOneData, userTwoData])
}

export async function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    let response = await fetch(endpoint);
    let data = await response.json();
    if (!data.items) {
        throw new Error(data.message);
    }
    return data.items;
}