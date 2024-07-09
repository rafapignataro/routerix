#!/usr/bin/env node

import { Command } from 'commander';
import { generate, init, preview } from '../lib';

const program = new Command();

program
  .name('Routerix')
  .description('Generate a UI for your routes! 🛣️')
  .version('1.0.0');

program
  .command('init')
  .description('create config file - not required if using cli args')
  .action(() => {
    init();
  });

program
  .command('generate')
  .description('generate Routerix app based on your routes')
  .option('-p, --provider <provider>', 'Provider. Check README for current supported providers')
  .option('-r, --rootPath <rootPath>', 'Routes root path')
  .action((options) => {
    if (!options.provider || !options.rootPath) return generate();

    generate({
      provider: options.provider,
      rootPath: options.rootPath
    });
  });

program
  .command('preview')
  .description('preview Routerix app in a development server')
  .action(() => {
    preview();
  });

program.parse(process.argv);