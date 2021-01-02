import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Hoof from '../lib/hoof-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Hoof.HoofStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
