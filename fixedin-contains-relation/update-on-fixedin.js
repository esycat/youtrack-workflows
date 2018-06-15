var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var utils = require('./utils');

exports.rule = entities.Issue.onChange({
  title: workflow.i18n('Update when marked as “Fixed in”'),
  guard: function(ctx) {
    return ctx.issue.links['fixed in'].added.isNotEmpty();
  },
  action: function(ctx) {
    var issue = ctx.issue;
    var fixedIn = issue.links['fixed in'].added.first();

    utils.updateFrom(issue, fixedIn);
  }
});