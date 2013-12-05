// istanbul (recommended by hunter )
// verbose mode (  )
// testing ajax (  )

var $ = require("jquery");

function Task(settings) {

  // set default values for Tasks
  this.progressStatus = "incomplete";
  this.importance = 0;
  this.urgency = 0;
  this.dueDate = new Date();

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

Task.prototype.setDueDate = function(dueDate) {
  this.dueDate = dueDate;
};

Task.prototype.getDueDate = function() {
  return(this.dueDate);
};


// Tasks class: a collection of Task objects

function Tasks() {
  this.list = [];
  return this;
}

Tasks.prototype.getTasks = function(){
  for ( var a; a < this.list.length; a++ ) {
    console.log(this.list[a]);
  }
};


myTaskApp = new TaskApp();

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
  var setClear = setTimeout(self.clear, 550);

  this.scaleout();

  var getTaskData = function() {

    $.getJSON('http://localhost/tdd/js/data/' + getFile + '.json', function(data) {

      $.each(data.tasks, function(i, taskData) {
        taskData = data.tasks[i];
        importanceScore = taskData.importanceScore;
        urgencyScore = taskData.urgencyScore;
        $("section#main").append('<span id="count'+i+'" style="background:' + self.setColor(importanceScore, urgencyScore)+';left:' + importanceScore*60 + 'px;bottom:' + urgencyScore*60 + 'px;">' + taskData.title + '</span>');
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

  }; // end: getTaskData

  var setGetTaskData = setTimeout(getTaskData, 700);

};


TaskApp.prototype.setCalendarDate = function(date, amount) {
    
    var self = this;

    var tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() + amount);
    self.calendarDateDisplayed.setDate(tmpDate.getDate());

    return tmpDate;
};

TaskApp.prototype.init = function() {
  this.getData('tasks7');
  var self = this;

  $('#setDate').on('click',function(){
    self.getData('tasks2');
  });

  var eleDateHeading = $('#dateInfo #heading');
  eleDateHeading.text( self.calendarDateDisplayed.toLocaleDateString() );

  $('#dateInfo #navNext').on('click',function(){
    eleDateHeading.text( self.setCalendarDate(self.calendarDateDisplayed, 1).toLocaleDateString() );
    self.getData('tasks5');
  });
  $('#dateInfo #navPrevious').on('click',function(){
    eleDateHeading.text( self.setCalendarDate(self.calendarDateDisplayed, -1).toLocaleDateString() );
     self.getData('tasks1');
  });

};


  myTaskApp.init();



/* begin test suite */

describe("Task", function() {
  var myTask;

  /* note: Jasmine beforeEach function executes the enclosed anonymous function before each describe block */
  beforeEach(function() {
    myTask = new Task();
    myTaskApp.init();
  });

  describe( " status getter function ", function () {
    it("should return the status of a task", function() {
      var testStatus = 'complete';
      myTask.setProgressStatus(testStatus);
      expect(myTask.getProgressStatus()).toEqual(testStatus);
    });
  });

  describe( " importance setter function ", function () {
    it("should set the importance of a task with a number from 0 to 9", function() {
      var testImportance = 7;
      expect(testImportance).toEqual(jasmine.any(Number));
      expect(testImportance).toBeGreaterThan(-1);
      expect(testImportance).toBeLessThan(10);

      myTask.setImportance(testImportance);
      expect(myTask.getImportance()).toEqual(testImportance);
    });
  });

  describe( " importance getter function ", function () {
    it("should return the importance of a task", function() {
      var testImportance = 7;
      myTask.setImportance(testImportance);
      expect(myTask.getImportance()).toEqual(testImportance);
    });
  });

  describe( " urgency setter function ", function () {
    it("should set the urgency of a task with a number from 0 to 9", function() {
      var testUrgency = 1;
      expect(testUrgency).toEqual(jasmine.any(Number));
      expect(testUrgency).toBeGreaterThan(-1);
      expect(testUrgency).toBeLessThan(10);
    });
  });

  describe( " urgency getter function ", function () {
    it("should return the urgency of a task", function() {
      var testUrgency = 7;
      myTask.setUrgency(testUrgency);
      expect(myTask.getUrgency()).toEqual(testUrgency);
    });
  });

  describe( " due date getter function ", function () {
    it("should return the date that a task is due", function() {
      expect(myTask.getDueDate()).not.toBe( null );
    });
  });

});



