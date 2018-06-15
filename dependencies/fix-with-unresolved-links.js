var entities = require('@jetbrains/youtrack-scripting-api/entities');
var workflow = require('@jetbrains/youtrack-scripting-api/workflow');

exports.rule = entities.Issue.onChange({
  title: workflow.i18n('Block resolving issues with unresolved dependencies'),
  guard: function(ctx) {
    var issue = ctx.issue;
    var links = issue.links;
    return issue.becomesResolved && (links['depends on'].isNotEmpty() || links['parent for'].isNotEmpty());
  },
  action: function(ctx) {
    var issue = ctx.issue;
    var links = issue.links;

    // Check dependencies
    links['depends on'].forEach(function(dep) {
      if (!dep.project.isArchived && dep.isReported) {
        workflow.check(dep.isResolved, workflow.i18n('The issue has unresolved dependencies and thus cannot be marked as Resolved (depends on {0})', dep.id));
      }
    });
    
    // Check subtasks
    links['parent for'].forEach(function(dep) {
      if (!dep.project.isArchived && dep.isReported) {
        workflow.check(dep.isResolved, workflow.i18n('The issue has unresolved subtasks and thus cannot be marked as Resolved (subtask: {0})', dep.id));
      }
    });
  }
});