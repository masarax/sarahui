const checks = ['aws', 'amazon', 'openjdk', 'oracle', 'vscodium', 'sonarcloud', 'sonarlint', 'css3', 'css'];
for (const c of checks) {
  const r = await fetch(`https://cdn.simpleicons.org/${c}`);
  console.log(c, r.status);
}

