/*
test spec for the application view
*/

describe("TaskApp View", function() {
  
  var myTaskApp;

  /* note: Jasmine beforeEach function executes the enclosed anonymous function before each describe block */
  beforeEach(function() {
    loadFixtures('index.html');
    loadJSONFixtures('tasks1.json');
    myTaskApp = new TaskApp();
  });

  describe( " calling the getData function ", function() {
    it("should asynchronously request json task data", function() {
      spyOn($, 'getJSON');
      var testFileName = 'tasks10';
      myTaskApp.getData( testFileName );
      expect($.getJSON).toHaveBeenCalledWith('http://pixelonezero.com/public/tdd/js/data/' + testFileName + ".json", jasmine.any(Function));
    });
  });

  describe( " calling the clear function ", function() {
    it ("should remove task span elements from the view", function() {
      myTaskApp.clear();
      expect($('section#main')).not.toContain('span');
    });
  });

  describe(" scalein function for a task", function() {
    it ("should add classname scalein to a task span element", function() {
        $('section#main').append('<span></span>');
        myTaskApp.scalein();
      expect($('section#main span')).toHaveClass('scalein');
    });
  });

  describe(" click handler function for the previous date arrow", function() {
    it ("should set the date back by one day", function() {
      var spyEvent = spyOnEvent('#navPrevious', 'click');
      $('#navPrevious').click();
      expect('click').toHaveBeenTriggeredOn('#navPrevious');
      expect(spyEvent).toHaveBeenTriggered();
    });
  });

  describe(" click handler function for the next date arrow", function() {
    it ("should set the date forward by one day", function() {
      var spyEvent = spyOnEvent('#navNext', 'click');
      $('#navNext').click();
      expect('click').toHaveBeenTriggeredOn('#navNext');
      expect(spyEvent).toHaveBeenTriggered();
    });
  });

});