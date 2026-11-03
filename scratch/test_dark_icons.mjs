const res = await fetch('https://cdn.simpleicons.org/nextdotjs/white');
console.log(res.status, (await res.text()).slice(0, 50));
const res2 = await fetch('https://cdn.simpleicons.org/github/white');
console.log(res2.status, (await res2.text()).slice(0, 50));

