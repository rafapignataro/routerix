#!/usr/bin/env node

import { Command } from 'commander';
import { generate, init, preview } from './lib';

const program = new Command();

program
  .name('Atlas.js')
  .description('Generate a UI for your routes! 🛣️')
  .version('1.0.0');


program
  .command('init')
  .description('Creates a config file where you can better define properties 👷')
  .action(() => {
    init();
  });

program
  .command('generate')
  .description('Creates your route-based static UI 🙅‍♂️')
  .action(() => {
    generate();
  });

program
  .command('preview')
  .description('Preview your route-based UI in a development server 🫣')
  .action(() => {
    preview();
  });

program.parse(process.argv);