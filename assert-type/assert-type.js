var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: workflow.i18n('Require Type to be specified'),
  guard: function(ctx) {
    var issue = ctx.issue;
    return !issue.fields.Type && !issue.isChanged('project');
  },
  action: function(ctx) {
    ctx.issue.fields.required(ctx.Type, 'Please specify issue Type.');
  },
  requirements: {
    Type: {
      type: entities.EnumField.fieldType
    }
  }
});