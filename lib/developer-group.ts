import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'

import config from './config'

export class DeveloperGroupStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const environmentName = new cdk.CfnParameter(this, 'environmentName', {
      type: 'String',
    })
    const targetAccountId = new cdk.CfnParameter(this, 'targetAccount', {
      type: 'String',
    })
    const users = new cdk.CfnParameter(this, 'users', {
      type: 'CommaDelimitedList',
    })

    const developerGroup = new iam.Group(this, 'DeveloperGroup', {
      groupName: 'DeveloperGroup',
      managedPolicies: [
        new iam.ManagedPolicy(this, 'DeveloperManagedPolicy', {
          managedPolicyName: 'DeveloperManagedPolicy',
          description: 'DeveloperGroup policy',
          document: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                actions: ['sts:AssumeRole'],
                resources: [
                  `arn:aws:iam::${targetAccountId.valueAsString}:role/${config.organization}-${environmentName.valueAsString}`,
                  `arn:aws:iam::${targetAccountId.valueAsString}:role/read-only`,
                ],
                effect: iam.Effect.ALLOW,
                conditions: {
                  Bool: {
                    'aws:MultiFactorAuthPresent': true,
                    'aws:SecureTransport': true,
                  },
                  NumericLessThan: {
                    'aws:MultiFactorAuthAge': 43200,
                  },
                },
              }),
            ],
          }),
        }),
      ],
    })

    new iam.CfnUserToGroupAddition(this, 'UserToGroupAddition', {
      groupName: developerGroup.groupName,
      users: users.valueAsList,
    })
  }
}
