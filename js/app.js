//todo (before demo): 
// /- setup xampp on laptop for demo environment
// /- reserve room for demo
// >- write test specs
// >- run test specs
// \- outline talk in html form
// /- run test specs in nodejs and as standalone js files
//
// - nice to have: set up mysql database for task data (would replace json files)
// - nice to have: ability to update tasks via ui
// - nice to have: ability to delete tasks via ui



$(document).ready(function() {

  myTaskApp = new TaskApp();
  myTaskApp.init();

});

TaskApp.prototype.constructor = TaskApp;

/**
 * taskApp class: top-level namespace for the task application.
 * @constructor
 * @this {twcPlayer}
 * @param {string} domId The HTML id value that contains the twcPlayer.
 */
function TaskApp() {

  this.taskData = {};
  this.myTask = {};
  this.myTasks = new Tasks();
  this.importanceScore = 0;
  this.urgencyScore = 0;
  this.calendarDateDisplayed = new Date();
  this.currentTaskIndex = 1;
  this.TASK_INDEX_MAX = 15;
  var self;
  self = this;

  return this;

}

/**
 * Set color of a task in the view layer.
 * @param {integer} importance of task (0 is least important, 9 is the most important)
 * @param {integer} urgency of task (0 is least urgent, 9 is the most urgent)
 */
TaskApp.prototype.setColor = function(importance, urgency) {
  
  var taskColor;
  // red:
  if (importance >= 5 && urgency >= 5) {
    taskColor = '#f00';
  }
  // lightblue:
  if (importance >= 5 && urgency <= 4) {
    taskColor = '#40a7d6';
  }
  // orange:
  if (importance <= 4 && urgency >= 5) {
    taskColor = '#ffa500';
  }
  // light gray:
  if (importance <= 4 && urgency <= 4) {
    taskColor = '#555';
  }
  return taskColor;

};

/**
 * scalein the task icons in the view
 */
TaskApp.prototype.scalein = function() {
  $('section#main span').removeClass('scaleout').addClass('scalein');
};
/**
 * scaleout the task icons in the view
 */
TaskApp.prototype.scaleout = function() {
  $('section#main span').addClass('scaleout').removeClass('scalein');
};
/**
 * remove the task icons from the view
 */
TaskApp.prototype.clear = function() {
  $('section#main span').remove();
};


TaskApp.prototype.getData = function(file) {

  var getFile = file;
  var eleTaskInfo = $('#dateInfo #taskInfo');
  var self = this;

  this.scaleout();

    $.getJSON('http://pixelonezero.com/public/tdd/js/data/' + getFile + '.json', function(data) {

      $.each(data.tasks, function(i, taskData) {
          taskData = data.tasks[i];
          importanceScore = taskData.importanceScore;
          urgencyScore = taskData.urgencyScore;
          
          $("section#main").append('<span id="count'+i+'" class="scalein" style="background:' + self.setColor(importanceScore, urgencyScore)+';left:' + importanceScore*60 + 'px;bottom:' + urgencyScore*60 + 'px;">' + taskData.title + '</span>');
          myTask = new Task();
          self.myTasks.list.push(myTask);

          $('span#count'+i).on('click',function(){
            var currentTask = data.tasks[i];
            return function() {
              renderTaskDetails(currentTask, i);
            }();
          });

        });

      function renderTaskDetails(currentTask, counter) {
        eleTaskInfo.text('');
        eleTaskInfo.append('<h2>' +  currentTask.title + '</h2>');
        eleTaskInfo.append('<ul>');
        eleTaskInfo.append('<li>Progress: ' + currentTask.progressStatus + '</li>');
        eleTaskInfo.append('<li>Importance: ' + currentTask.importanceScore + '</li>');
        eleTaskInfo.append('<li>Urgency: ' + currentTask.urgencyScore + '</li>');
        eleTaskInfo.append('<li>Due date: ' + currentTask.dueDate + '</li>');
        eleTaskInfo.append('</ul>');
      }

    });

};


TaskApp.prototype.setCalendarDate = function(date, amount) {
    
    var self = this;

    var tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() + amount);
    self.calendarDateDisplayed.setDate(tmpDate.getDate());

    return tmpDate;
};

TaskApp.prototype.init = function() {
  this.getData('tasks' + this.currentTaskIndex);
  var self = this;

  var eleDateHeading = $('#dateInfo #heading');
  eleDateHeading.text( self.calendarDateDisplayed.toLocaleDateString() );

  $('#dateInfo #navNext').on('click',function(e){
    if (self.currentTaskIndex === self.TASK_INDEX_MAX) {
      return;
    }
    eleDateHeading.text( self.setCalendarDate(self.calendarDateDisplayed, 1).toLocaleDateString() );
    self.currentTaskIndex++;
    self.getData( 'tasks' + self.currentTaskIndex );
  });
  $('#dateInfo #navPrevious').on('click',function(e){
    if (self.currentTaskIndex === 1) {
      return;
    }
    eleDateHeading.text( self.setCalendarDate(self.calendarDateDisplayed, -1).toLocaleDateString() );
    self.currentTaskIndex--;
    self.getData( 'tasks' + self.currentTaskIndex );
  });

};
