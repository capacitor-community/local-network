#!/usr/bin/env node
/**
 * Prepares a release.
 *
 * Bumps the version in package.json and regenerates the version files that are
 * tracked in git, so the repository never disagrees with the published package.
 *
 * Usage:
 *   node ./scripts/release.mjs 8.0.1
 *
 * This script does not commit, tag or push anything: those steps stay with the
 * maintainer.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const version = process.argv[2];

if (!version) {
  console.error('❌ Missing version. Usage: node ./scripts/release.mjs <version>');
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(version)) {
  console.error(`❌ "${version}" is not a valid semantic version.`);
  process.exit(1);
}

const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (packageJson.version === version) {
  console.error(`❌ The version is already ${version}.`);
  process.exit(1);
}

// Update package.json in place, preserving its formatting.
packageJson.version = version;
fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

// Regenerate ios/Sources/<Plugin>/Version.swift and src/version.ts from package.json.
execFileSync('node', [path.join(__dirname, 'sync-version.mjs')], { cwd: rootDir, stdio: 'inherit' });

console.log(`✅ Prepared ${version}.`);
console.log(`
Review the changes, then commit and tag:

  git add package.json src/version.ts
  git commit -m "release: ${version}"
  git tag v${version}
  git push origin main
  git push origin v${version}

The tag triggers .github/workflows/release.yml, which verifies the tagged
commit and publishes the package to npm.
`);
