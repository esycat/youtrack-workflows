exports.isResolvable = function(ctx) {
    var unresolvable = [
        ctx.State.Open.name,
        ctx.State.AttentionRequired.name,
        ctx.State.InDevelopment.name
    ];

    return unresolvable.indexOf(ctx.issue.fields.State.name) === -1;
};
