var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: workflow.i18n('Assign to current user when state changes'),
  guard: function(ctx) {
    var issue = ctx.issue;
    var fields = issue.fields;
    return fields.becomes(ctx.State, ctx.State.InDevelopment) && !fields.Assignee;
  },
  action: function(ctx) {
    ctx.issue.fields.Assignee = ctx.currentUser;
  },
  requirements: {
    Assignee: {
      type: entities.User.fieldType
    },
    State: {
      type: entities.State.fieldType,
      InDevelopment: {
        name: 'In Development'
      }
    }
  }
});