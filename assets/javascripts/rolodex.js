////////////////////////////////////
/////////////// MODEL /////////////
///////////////////////////////////

var Card = Backbone.Model.extend({
  defaults: {
    category: "Personal";
  },

  validate: function(attrs){
    if (!attrs.name)
      return "Name is required.";
  }
});


/////////////////////////////////////////
/////////////// COLLECTION  /////////////
/////////////////////////////////////////

// Will hold objects of the Service model
var CardList = Backbone.Collection.extend({
  model: Card,

  // Return an array with only personal contacts
  getPersonal: function(){
    return this.where({category: "personal"});
  }
});

// Prefill the collection with cards.
var cards = new CardList ([
  new Card({ first_name: 'Name One',
              last_name: "Name",
              street_address1: "123 ABC Street",
              city: "New York City",
              state: "NY",
              zip: 10003,
              phone: 2125559892,
              email: "hello@email.com"}),

  new Card({ first_name: 'Name Two',
              last_name: "Name",
              street_address1: "101 Elm Street",
              city: "Chicago",
              state: "IL",
              zip: 60611,
              phone: 6125559892,
              email: "hello@gmail.com"}),

new Card({ first_name: 'Name Three',
            last_name: "Name",
            street_address1: "332 1st Ave",
            city: "Minneapolis",
            state: "MN",
            zip: 55401,
            phone: 6125559892,
            email: "hola@email.com"}),

]);


////////////////////////////////////
/////////////// VIEW /////////////
///////////////////////////////////

var CardView = Backbone.view.extend({
  tagName: 'li',

  events: {
    'click': 'showCard'
  },

  initialize: function(){

    // Set up event listeners. The change backbone event
    // is raised when a property changes (like the checked field)

    this.listenTo(this.model, 'change', this.render);
  },

render: function(){

  // Create the HTML

  this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
  this.$('input').prop('checked', this.model.get('checked'));

  // Returning the object is a good practice
  // that makes chaining possible
  return this;
},
})

/////////////////////////////////////////////
/////////////// CARD LIST VIEW ////////////
/////////////////////////////////////////

var CardsView = Backbone.View.extend({
    el: $('main'),


		initialize: function(){

			// Cache these selectors
			this.total = $('#total span');
			this.list = $('#services');

			// Listen for the change event on the collection.
			// This is equivalent to listening on every one of the
			// service objects in the collection.
			this.listenTo(services, 'change', this.render);

			// Create views for every one of the services in the
			// collection and add them to the page

			services.each(function(service){

				var view = new ServiceView({ model: service });
				this.list.append(view.render().el);

			}, this);	// "this" is the context in the callback
		},

		render: function(){

			// Calculate the total order amount by agregating
			// the prices of only the checked elements

			var total = 0;

			_.each(services.getChecked(), function(elem){
				total += elem.get('price');
			});

			// Update the total price
			this.total.text('$'+total);

			return this;
		}
	});

	new App();
})
