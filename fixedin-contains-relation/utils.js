exports.updateFrom = function(contained, fixedIn) {
  // do not modify issues from other projects
  if (contained.project.key !== fixedIn.project.key) {
    return;
  }

  contained.fields.Resolution = fixedIn.fields.Resolution;
  contained.fields.State = fixedIn.fields.State; // State must be copied after Resolution
  contained.fields.Assignee = fixedIn.fields.Assignee;
  contained.fields['Fix versions'] = fixedIn.fields['Fix versions'];
};