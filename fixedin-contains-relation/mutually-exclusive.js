var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var utils = require('./utils');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Block mutually exclusive relations'),
    guard: function (ctx) {
        var links = ctx.issue.links;
        return links['fixed in'].added.isNotEmpty() || links.contains.added.isNotEmpty();
    },
    action: function (ctx) {
        var links = ctx.issue.links;

        var isLogicalError = links['fixed in'].isNotEmpty() && links.contains.isNotEmpty();
        var message = 'An issue cannot simultaneously “be fixed in another issue” and “contain other issues”';

        workflow.check(!isLogicalError, workflow.i18n(message));
    }
});