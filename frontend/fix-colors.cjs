const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/USER/Desktop/projects/Careerist/frontend/src/components';

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Replace bg-brand-ink followed by spaces and text-brand-ink with just text-brand-ink
            content = content.replace(/bg-brand-ink\s+text-brand-ink/g, 'text-brand-ink');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed', fullPath);
            }
        }
    });
}

traverse(directory);
