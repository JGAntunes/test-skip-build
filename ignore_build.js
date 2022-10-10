import process from "node:process";
import { exec } from "node:child_process";

const { CACHED_COMMIT_REF, COMMIT_REF } = process.env;

function run_diff() {
  // Handle edge case where we're building without cache, in which case CACHED_COMMIT_REF will be the same as COMMIT_REF
  if (CACHED_COMMIT_REF === COMMIT_REF) {
    console.log(
      `Building with fresh cache. Cached commit ref - ${CACHED_COMMIT_REF} - is the same as this commit ref - ${COMMIT_REF}`
    );
    process.exitCode = 1;
    return;
  }

  exec(`git diff ${CACHED_COMMIT_REF} ${$COMMIT_REF} -- dist`, (error) => {
    if (error) {
      console.log(`Git diff returned ${error.code}`);
      process.exitCode = 1;
    }
    console.log("Skipping build, no changes detected");
  });
}

run_diff();
