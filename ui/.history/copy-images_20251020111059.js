#!/usr/bin/env node

/**
 * Copy Images Script
 * 
 * This script copies all images from data/images/ to public/data/images/
 * so they can be served by the Vite development server and included in builds.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataImagesPath = path.join(__dirname, 'data', 'images');
const publicImagesPath = path.join(__dirname, 'public', 'data', 'images');

console.log('📋 Copying images from data/images to public/data/images...\n');

// Ensure directories exist
if (!fs.existsSync(dataImagesPath)) {
  console.log('❌ Source directory data/images does not exist');
  process.exit(1);
}

if (!fs.existsSync(publicImagesPath)) {
  console.log('📁 Creating public/data/images directory...');
  fs.mkdirSync(publicImagesPath, { recursive: true });
}

// Copy all files
const files = fs.readdirSync(dataImagesPath);

if (files.length === 0) {
  console.log('ℹ️  No files found in data/images directory');
} else {
  files.forEach(file => {
    const sourcePath = path.join(dataImagesPath, file);
    const destPath = path.join(publicImagesPath, file);
    
    // Check if it's a file (not a directory)
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied: ${file}`);
    }
  });
  
  console.log(`\n🎉 Successfully copied ${files.length} files!`);
}

console.log('\n💡 Images are now available at URLs like: /data/images/filename.png');