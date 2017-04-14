var $ = require('jquery');

module.exports = {
  setTodos: function(todos){
    if($.isArray(todos)){
      //Takes the Array and convery into string
      localStorage.setItem('todos',JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function(){
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    //Convert the string back to Array
    try {
      todos = JSON.parse(stringTodos);
    } catch (e){

    }

  //  return $.isArray(todos) ? todos : [];

    if($.isArray(todos)){
      return todos;
    }
    else{
      return [];
    }
  },

  filterTodos: function(todos,showCompleted, searchText){
    var filteredTodos = todos;

    //Filter by showCompleted

    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });


    filteredTodos.sort((a,b) => {
      if(!a.completed && b.completed){
        return -1;
      }else if(a.completed && !b.completed){
        return 1;
      }else {
      return 0;
      }
    });

    return filteredTodos;
  }
};
