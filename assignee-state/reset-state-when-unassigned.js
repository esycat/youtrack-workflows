var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: workflow.i18n('Reset State to Open when unassigned'),
  guard: function(ctx) {
    var issue = ctx.issue;
    var fields = issue.fields;
    return issue.isChanged(ctx.Assignee) && !fields.Assignee && fields.State.name != ctx.State.Open.name;
  },
  action: function(ctx) {
    var issue = ctx.issue;
    issue.fields.State = ctx.State.Open;
    workflow.message(workflow.i18n('The issue\'s state has been reset'));
  },
  requirements: {
    Assignee: {
      type: entities.User.fieldType
    },
    State: {
      type: entities.State.fieldType,
      Open: {}
    }
  }
});