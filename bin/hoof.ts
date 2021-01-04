#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { DeveloperGroupStack } from '../lib/developer-group'
import { DeveloperRoleStack } from '../lib/developer-role'

const app = new cdk.App()
new DeveloperRoleStack(app, 'developer-role')
new DeveloperGroupStack(app, 'developer-group-prod')
