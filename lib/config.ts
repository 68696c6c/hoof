class Environment {
  readonly name: string
  readonly account: number
  readonly region: string

  constructor(name: string, account: number, region: string) {
    this.name = name
    this.account = account
    this.region = region
  }
}

export class Config {
  readonly organization: string
  readonly root: Environment
  readonly prod: Environment
  readonly stage: Environment

  constructor(
    org: string,
    rootAccount: number,
    prodAccount: number,
    stageAccount: number,
    region: string,
  ) {
    this.organization = org
    this.root = new Environment('root', rootAccount, region)
    this.prod = new Environment('prod', prodAccount, region)
    this.stage = new Environment('stage', stageAccount, region)
  }
}

export default new Config('goat', 237829512642, 771299397888, 0, 'us-east-1')
