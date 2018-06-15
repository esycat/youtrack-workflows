var entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Require Resolution to be specified',
  guard: function(ctx) {
    return true;
  },
  action: function(ctx) {
    var issue = ctx.issue;
  },
  requirements: {
  }
});