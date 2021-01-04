import { SynthUtils } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'

import { DeveloperRoleStack } from '../lib/developer-role'
import { DeveloperGroupStack } from '../lib/developer-group'

test('DeveloperRoleStack', () => {
  const app = new cdk.App()
  const stack = new DeveloperRoleStack(app, 'developer-role')
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})

test('DeveloperGroupStack', () => {
  const app = new cdk.App()
  const stack = new DeveloperGroupStack(app, 'developer-group-prod')
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
})
