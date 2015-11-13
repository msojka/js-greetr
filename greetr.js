(function(global, $) {
  
  // 'new' an object
  var greetr = function(firstName, lastName, language) {
    return new greetr.init(firstName, lastName, language);
  }
  
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
  
  // prototype holds methods (to save memory space)
  greetr.prototype = {
    
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
  
  // the actual object is created here, allowing us to 'new' an object without calling 'new' (instead it's returned by the top-most Greeter function)
  greetr.init = function(firstName, lastName, language) {
    
    var self = this;
    
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
    
    self.validate();
    
  }
  
  greetr.init.prototype = greetr.prototype;
  
  // attach our greetr to the global object and provide a shorthand G$
  global.greetr = global.g$ = greetr;
  
}(window, jQuery));