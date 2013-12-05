/* begin test suite */

describe("Task", function() {
  var myTask;

  /* note: Jasmine beforeEach function executes the enclosed anonymous function before each describe block */
  beforeEach(function() {
    myTask = new Task();
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

describe("TaskApp", function() {
  var myTaskApp;

  /* note: Jasmine beforeEach function executes the enclosed anonymous function before each describe block */
  beforeEach(function() {
    myTaskApp = new TaskApp();
    myTaskApp.init();
  });

  describe( " color setter function ", function () {
    it("should set the color of a task in the view", function() {
      var testImportance = 5;
      var testUrgency = 5;
      var testTaskColor = '#f00';
      myTaskApp.setColor(testImportance, testUrgency);
      expect(myTaskApp.setColor(testImportance, testUrgency)).toEqual(testTaskColor);
    });
  });

  describe( " scalein function ", function () {
    it("should add a class of scalein to the span for each task", function() {
      expect().toEqual();
    });
  });

  describe( " scaleout function ", function () {
    it("should add a class of scaleout to the span for each task", function() {
      expect().toEqual();
    });
  });

  describe( " clear function ", function () {
    it("should remove all task span elements", function() {
      expect().toEqual();
    });
  });

  describe( " getData function ", function () {
    it("should send a request for task data", function() {
      expect().toEqual();
    });
  });

  describe( " setCalendarDate function ", function () {
    it("should set the currently viewable calendar date", function() {
      expect().toEqual();
    });
  });

  describe( " init function ", function () {
    it("should create an object instance of myTaskApp", function() {
      expect().toEqual();
    });
  });

});