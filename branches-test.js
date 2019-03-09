
/*
  Don't consider this script, it's useful just for launching the tests on every branch and be 100%
  sure that the new commits dont' break anything
*/

const execSync = require('child_process').execSync;

(async () => {
  execSync('git checkout test-1-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout test-2-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout test-3-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout test-4-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout test-5-step1-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout test-5-step2-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout test-6-solution');
  execSync('yarn test', {stdio:[0,1,2]});
  execSync('git checkout develop');
  execSync('yarn test', {stdio:[0,1,2]});
})()
