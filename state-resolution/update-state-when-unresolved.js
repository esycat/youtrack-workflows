var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Change State to unresolved when Resolution is cleared'),
    guard: function(ctx) {
        var fields = ctx.issue.fields;
        return fields.becomes(ctx.Resolution, null) && fields.State.isResolved;
    },
    action: function(ctx) {
        ctx.issue.State = ctx.State.AttentionRequired;
    },
    requirements: {
        State: {
            type: entities.State.fieldType,
            AttentionRequired: {
                name: 'Attention Required',
            }
        },
        Resolution: {
            type: entities.EnumField.fieldType
        }
    }
});