import fs from 'node:fs';
import path from 'node:path';

type Idea = {
  id: string;
  text: string;
  tags: string[];
  createdAt: string;
};

const dataPath = path.resolve(process.cwd(), 'ideas.json');

function readIdeas(): Idea[] {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw) as Idea[];
}

function writeIdeas(ideas: Idea[]) {
  fs.writeFileSync(dataPath, JSON.stringify(ideas, null, 2) + '\n', 'utf8');
}

function addIdea(text: string, tags: string[]) {
  if (!text.trim()) {
    console.error('Idea text is required.');
    process.exit(1);
  }
  const ideas = readIdeas();
  const idea: Idea = {
    id: `${Date.now()}`,
    text: text.trim(),
    tags,
    createdAt: new Date().toISOString()
  };
  ideas.unshift(idea);
  writeIdeas(ideas);
  console.log(`Added idea ${idea.id}`);
}

function listIdeas(tag?: string) {
  const ideas = readIdeas();
  const filtered = tag ? ideas.filter((i) => i.tags.includes(tag)) : ideas;
  if (!filtered.length) {
    console.log('No ideas found.');
    return;
  }
  for (const idea of filtered) {
    const tagText = idea.tags.length ? ` [${idea.tags.join(',')}]` : '';
    console.log(`${idea.id}: ${idea.text}${tagText}`);
  }
}

const [, , cmd, ...args] = process.argv;

if (cmd === 'add') {
  const text = args[0] ?? '';
  const tagsFlagIndex = args.indexOf('--tags');
  const tags = tagsFlagIndex >= 0 && args[tagsFlagIndex + 1]
    ? args[tagsFlagIndex + 1].split(',').map((t) => t.trim()).filter(Boolean)
    : [];
  addIdea(text, tags);
} else if (cmd === 'list') {
  const tagFlagIndex = args.indexOf('--tag');
  const tag = tagFlagIndex >= 0 ? args[tagFlagIndex + 1] : undefined;
  listIdeas(tag);
} else {
  console.log('Usage: npm start -- add "idea" [--tags a,b] | list [--tag a]');
}
