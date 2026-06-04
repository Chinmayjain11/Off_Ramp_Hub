module.exports = {
  default: {
    require: [
      'src/world/CustomWorld.js',
      'src/hooks/hooks.js',
      'src/steps/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    tags: process.env.TAGS || '@smoke',
    parallel: 0,
    retry: 0,
    timeout: 60000
  },
  // ── OTP profile ───────────────────────────────────────────────
  otp: {
    require: [
      'src/world/CustomWorld.js',
      'src/hooks/hooks.js',
      'src/steps/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    tags: '@otp',
    timeout: 60000,
    retry: 0
  },

    // ── e2e profile ───────────────────────────────────────────────
  e2e: {
    require: [
      'src/world/CustomWorld.js',
      'src/hooks/hooks.js',
      'src/steps/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    tags: '@e2e',
    timeout: 60000,
    retry: 0
  }
};