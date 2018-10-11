var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var utils = require('./utils');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Propagate changes to contained issues'),
    guard: function (ctx) {
        var issue = ctx.issue;
        return issue.links.contains.isNotEmpty() && (issue.isChanged(ctx.State) || issue.isChanged(ctx.Resolution) || issue.isChanged(ctx.Assignee) || issue.isChanged(ctx.FixVersions));
    },
    action: function (ctx) {
        var issue = ctx.issue;

        issue.links.contains.forEach(function (containedIssue) {
            utils.updateFrom(containedIssue, issue);
        });

        workflow.message('Contained issues have been updated accordingly.');

        // TODO: For some reason, .map() doesn't work.
        // var containedIssues = issue.links.contains.map(function (containedIssue) { return containedIssue.id; });
        // workflow.message('Contained issue(s) have been updated accordingly: ' + containedIssues.join(', '));
    },
    requirements: {
        State: {
            type: entities.State.fieldType
        },
        Resolution: {
            type: entities.EnumField.fieldType
        },
        Assignee: {
            type: entities.User.fieldType
        },
        FixVersions: {
            name: 'Fix versions',
            type: entities.ProjectVersion.fieldType,
            multi: true
        }
    }

});