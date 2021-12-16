#!/usr/bin/env node
import process from 'process'
import { Command } from 'commander'

const cli = new Command()

cli.version('1.1.0', '-v --version')

cli.parse(process.argv)