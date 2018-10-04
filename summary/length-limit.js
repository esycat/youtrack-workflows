var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

var summaryMaxLength = 64;

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Require the Summary to be concise'),
    guard: function (ctx) {
        var issue = ctx.issue;
        return issue.becomesRemoved || issue.isChanged('summary');
    },
    action: function (ctx) {
        var condition = ctx.issue.summary.length <= summaryMaxLength;
        var message = workflow.i18n('The summary is excessively long. Please try to be concise');
        workflow.check(condition, message);
    }
});