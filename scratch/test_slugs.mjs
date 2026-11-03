const slugs = [
  'typescript', 'javascript', 'dart', 'java', 'react', 'flutter', 'android',
  'html5', 'css3', 'nodedotjs', 'express', 'nextdotjs', 'prisma', 'amazonaws',
  'postgresql', 'firebase', 'nginx', 'vercel', 'testinglibrary', 'jest', 'cypress',
  'docker', 'git', 'jira', 'github', 'gitlab', 'visualstudiocode', 'androidstudio',
  'sonarqube', 'figma'
];

async function test() {
  for (const slug of slugs) {
    try {
      const res = await fetch(`https://cdn.simpleicons.org/${slug}`);
      const text = await res.text();
      console.log(slug, res.status, text.slice(0, 40));
    } catch (e) {
      console.log(slug, 'ERROR', e.message);
    }
  }
}
test();

