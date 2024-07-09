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
  .option('-r, --rootPath', 'Routes root path')
  .action((str, options) => {
    console.log(str)
    console.log(options)
    generate();
  });

program
  .command('preview')
  .description('preview Routerix app in a development server')
  .action(() => {
    preview();
  });

program.parse(process.argv);