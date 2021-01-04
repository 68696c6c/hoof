import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'

import config from './config'

export class DeveloperRoleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const environmentName = new cdk.CfnParameter(this, 'environmentName', {
      type: 'String',
    })

    new iam.Role(this, 'DeveloperRole', {
      roleName: `${config.organization}-${environmentName.valueAsString}`,
      assumedBy: new iam.PrincipalWithConditions(new iam.AccountPrincipal(config.root.account), {
        Bool: {
          'aws:MultiFactorAuthPresent': true,
          'aws:SecureTransport': true,
        },
        NumericLessThan: {
          'aws:MultiFactorAuthAge': 43200,
        },
      }),
      managedPolicies: [{ managedPolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess' }],
    })
  }
}
