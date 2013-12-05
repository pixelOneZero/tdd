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