var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Require a fix version to resolve an issue'),
    guard: function (ctx) {
        return ctx.issue.becomesResolved;
    },
    action: function (ctx) {
        ctx.issue.fields.required(ctx.FixVersions, workflow.i18n('Please specify the Fix version(s)'));
    },
    requirements: {
        FixVersions: {
            name: 'Fix versions',
            type: entities.ProjectVersion.fieldType,
            multi: true
        }
    }
});