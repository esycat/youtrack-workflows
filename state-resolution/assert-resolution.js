var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');
var utils = require('./utils');

exports.rule = entities.Issue.onChange({
    title: workflow.i18n('Require a resolution when issue is progressing'),
    guard: function (ctx) {
        return ctx.issue.fields.isChanged(ctx.State);
    },
    action: function (ctx) {
        var fields = ctx.issue.fields;

        if (utils.isResolvable(ctx)) {
            var message = workflow.i18n('Please specify a resolution to mark as ' + fields.State.name + '.');
            fields.required(ctx.Resolution, message);
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
        },
        Resolution: {
            type: entities.EnumField.fieldType
        }
    }
});