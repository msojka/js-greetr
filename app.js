var g = g$('John', 'Doe');
g.greet().greet(true);

$('#login').click(function() {
  var loginGreetr = g$('John', 'Doe');
  $('#loginDiv').hide();
  loginGreetr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});