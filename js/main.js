var Employee = Backbone.Model.extend({
  // url:"js/data.json"
});

var EmployeesCollection = Backbone.Collection.extend({

  url: "js/data.json",

  model: Employee

});


// VIEW - self-invoking function
var GridView = (function(){

  var template = JST["employee"];

  function GridView(model) {
    // mixing backbone.events into it
    _.extend(this, Backbone.Events);
    this.model = model;
    this.$el = $("<tr />");
    // listening for when the model is changed and re-rendering it
    this.listenTo(this.model, "change", function(){
      this.render();
    });
  }

  GridView.prototype = {
    render: function() {
      return this.$el.html( template(this.model.toJSON()) );
    }
  }

  return GridView;

})();


$(function(){

  var employees = new EmployeesCollection();

  employees.on("add", function(model){
    var gridView = new GridView(model);
    $("tbody").append(gridView.render());
  }); 

  employees.fetch().done(function(){

    var firstEmployeePattern = employees.first();
      var headings = firstEmployeePattern.keys();
      
      _.each(headings, function(data) {
         $("thead tr").append($("<th />").text(data));
      });
  });


});
