#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HoofStack } from '../lib/hoof-stack';

const app = new cdk.App();
new HoofStack(app, 'HoofStack');
