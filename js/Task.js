function Task(settings) {

  // set default values for Tasks
  this.progressStatus = "incomplete";
  this.importance = 0;
  this.urgency = 0;
  var tmpDate = new Date();
  this.dueDate = new Date(tmpDate);

  var self = this;

  return this;

}

Task.prototype.setProgressStatus = function(status) {
  this.progressStatus = status;
};

Task.prototype.getProgressStatus = function() {
  return(this.progressStatus);
};

Task.prototype.setImportance = function(importance) {
  this.importance = importance;
};

Task.prototype.getImportance = function() {
  return(this.importance);
};

Task.prototype.setUrgency = function(urgency) {
  this.urgency = urgency;
};

Task.prototype.getUrgency = function() {
  return(this.urgency);
};

Task.prototype.getDueDate = function() {
  return(this.dueDate);
};