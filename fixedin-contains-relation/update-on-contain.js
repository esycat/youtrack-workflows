var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var utils = require('./utils');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Update added contained issues'),
    guard: function (ctx) {
        return ctx.issue.links.contains.added.isNotEmpty();
    },
    action: function (ctx) {
        var issue = ctx.issue;

        issue.links.contains.added.forEach(function (containedIssue) {
            utils.updateFrom(containedIssue, issue);
        });
    }
});