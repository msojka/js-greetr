(function(global, $) {
  
  // use function to create a new greetr object
  var greetr = function(firstName, lastName, language) {
    var newGreetr = Object.create(greetrProto);
    newGreetr.initProperty('firstName', firstName);
    newGreetr.initProperty('lastName', lastName);
    newGreetr.initProperty('language', language);
    newGreetr.validate();
    return newGreetr;
  };
  
  // hidden within the scope of the IIFE and never directly accessible
  var supportedLangs = ['en', 'es'];
  
  // informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };
  
  // formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };
  
  // logger messages
  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión'
  };
  
  // prototype holds properties and methods (to save memory space)
  var greetrProto = {
    
    firstName: '',
    lastName: '',
    language: 'en',
    
    initProperty: function(prop, value) {
      if(value !== undefined) {
        this[prop] = value;
      }
    },
    
    // 'this' refers to the calling object at execution time
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    // checks valid language
    // references the externally inaccessible 'supportedLangs' within the closure
    validate: function() {
      if(supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },
    
    // retrieve messages from object by referring to properties using [] syntax
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!'; 
    },
    
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },
    
    greet: function(formal) {      
      var msg = formal ?
                  this.formalGreeting() :
                  this.greeting();
      
      if(console) {
        console.log(msg);
      }
      
      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },
    
    log: function() {
      if(console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }
      
      // make chainable
      return this;
    },
    
    setLang: function(lang) {
      this.language = lang;
      this.validate();
      
      // make chainable
      return this;
    },
    
    HTMLGreeting: function(selector, formal) {
      if(!$) {
        throw 'jQuery not loaded';
      }
      if(!selector) {
        throw 'Missing jQuery selector';
      }
      
      var msg = formal ?
                  this.formalGreeting() :
                  this.greeting();
      
      // inject the message in the chosen place in the DOM
      $(selector).html(msg);
      
      // make chainable
      return this;
    }
    
  };
  
  // attach our greetr to the global object and provide a shorthand g$
  global.greetr = global.g$ = greetr;
  
}(window, jQuery));