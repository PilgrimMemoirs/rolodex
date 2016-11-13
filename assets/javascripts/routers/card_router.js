CardRouter = Backbone.Router.extend({
  routes: {
    "card/new": "create",
    "cards/index": "index",
    "card/:id/edit": "edit",
    "card/:id/delete": "delete"
  }
  

)};
