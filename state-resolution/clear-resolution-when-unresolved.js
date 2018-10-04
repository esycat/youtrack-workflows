var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var utils = require('./utils');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Clear Resolution when State unresolved'),
    guard: function(ctx) {
        return ctx.issue.fields.isChanged(ctx.State);
    },
    action: function(ctx) {
        if (!utils.isResolvable(ctx)) {
            ctx.issue.fields.Resolution = null;
        }
    },
    requirements: {
        State: {
            type: entities.State.fieldType,
            Open: {},
            AttentionRequired: {
                name: 'Attention Required'
            },          
            InDevelopment: {
                name: 'In Development'
            }
        }
    }
});