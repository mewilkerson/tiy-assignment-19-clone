var Employee = Backbone.Model.extend({
  url:"js/data.json"
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
    })
  }

  GridView.prototype = {
    render: function() {
      return this.$el.html( template(this.model.toJSON()) );
    }
  }

  return GridView;

})();


$(function(){
  
  // calling with ajax, and iterating over each:
  $.ajax("js/data.json").done(function(data){


    _.each(data, function(datum){
                         // passing it some initial data (datum)
      var contactModel = new Employee(datum);

      var contactView = new GridView(contactModel);

      $(".employees").append(contactView.render());

    });

  }).fail(function(){
    console.log("ajax failed", arguments);
  });

});