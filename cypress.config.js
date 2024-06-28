const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');


module.exports = defineConfig({
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  numTestsKeptInMemory: 1,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks);
    },
  },
});
