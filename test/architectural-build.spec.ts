import { execSync } from 'child_process';
import { readdirSync } from 'fs';

describe('Architectural Build Project', () => {
  it('ensure the build has main.js file in the dist root', () => {
    const script = `npm run build`;
    const requiredFileInBuild = 'main.js';
    execSync(script);
    const result = readdirSync('./dist');
    const mainFileExists = result.some(
      (fileAndFolder) => fileAndFolder === requiredFileInBuild,
    );
    expect(mainFileExists).toBeTruthy();
  });
});
