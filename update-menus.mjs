import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'LoopLanding.tsx',
  'LoopPricing.tsx',
  'LoopEnterprise.tsx',
  'LoopBlog.tsx',
];

const componentsDir = path.join(process.cwd(), 'src/components');

filesToUpdate.forEach(file => {
  const filePath = path.join(componentsDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // The structure is roughly:
  // {/* Chat */}
  // <motion.a
  //   href="#"
  const regex = /(\{\/\*\s*Chat\s*\*\/\}\s*<motion\.a\s*href=")(#)(")/;
  
  if (regex.test(content)) {
    content = content.replace(regex, '$1/chat$3');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not find target in ${file}`);
  }
});
