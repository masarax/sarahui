const candidates = [
  'typescript', 'javascript', 'dart', 'react', 'flutter', 'android',
  'html5', 'css', 'nodedotjs', 'express', 'nextdotjs', 'prisma', 'amazonwebservices',
  'postgresql', 'firebase', 'nginx', 'vercel', 'testinglibrary', 'jest', 'cypress',
  'docker', 'git', 'jira', 'github', 'gitlab', 'visualstudio', 'androidstudio',
  'figma', 'tailwindcss', 'python', 'graphql', 'mongodb', 'redis', 'kubernetes', 'npm', 'vite', 'sass'
];

async function test() {
  const working = [];
  for (const slug of candidates) {
    try {
      const res = await fetch(`https://cdn.simpleicons.org/${slug}`);
      if (res.status === 200) working.push(slug);
      else console.log('FAILED:', slug, res.status);
    } catch (e) {
      console.log('ERROR:', slug, e.message);
    }
  }
  console.log('WORKING SLUGS (' + working.length + '):', JSON.stringify(working));
}
test();

