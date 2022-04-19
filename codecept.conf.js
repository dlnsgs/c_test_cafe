const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: "tests/*_spec.js",
  output: "./output",
  helpers: {
    TestCafe: {
      url: "https://www.saucedemo.com",
      browser: "chrome",
      show: true,
    },
  },
  include: {
    I: "./steps_file.js",
  },
  bootstrap: null,
  mocha: {},
  name: "comodo_task_testcafe",
};
