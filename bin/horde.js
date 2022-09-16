#!/usr/bin/env node

import * as commander from 'commander';
import formatLogs from '../src/index.js';

const program = new commander.Command();

program
  .arguments('<filepath>')
  .option('-d, --day [day]', 'grep logs by day in format YYYY-MM-DD', null)
  .option('-p, --prefix [prefix]', 'grep logs by prefix (RWC logger name)', null)
  .action(formatLogs);

program.parse(process.argv);