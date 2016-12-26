angular.module('quoteApp', []).
controller('quoteCntrl', ['$scope', function($scope) {
  $scope.randomVar = Math.floor(Math.random() * 10);
  $scope.i = Math.floor(Math.random() * 20);
  $scope.randomColorGen = function() {
    var str = '1234567890ABCDEF';
    var strArr = str.split('');
    var randomColorCode = '#';
    for (var i = 0; i < 6; i++) {
      randomColorCode += strArr[Math.floor(Math.random() * 16)];
    }
    return randomColorCode;
  }
  $scope.randomColor = {};
  $scope.randomColor.Code = $scope.randomColorGen();

  $scope.GenerateRandom = function() {
    if ($scope.i == 19)
      $scope.i = -1;
    $scope.i++;
    $scope.randomColor.Code = $scope.randomColorGen();
        
    animate(".demo", 'slideInDown');
    return false;
    
  }
  
  function animate(element_ID, animation) {
        $(element_ID).addClass(animation);
        var wait = window.setTimeout( function(){
            $(element_ID).removeClass(animation)}, 1500
        );
    }

  $scope.randomQuotes = [{
    quote: 'Dont cry because its over, smile because it happened',
    author: 'Dr. Sues',
    color: 'red'
  }, {
    quote: 'I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best',
    author: 'Marilyn Monroe',
    color: 'red'
  }, {
    quote: 'Be yourself; everyone else is already taken',
    author: 'Oscar Wilde',
    color: 'red'
  }, {
    quote: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe',
    author: 'Albert Einstein',
    color: 'red'
  }, {
    quote: 'Be who you are and say what you feel, because those who mind don\'t matter, and those who matter don\'t mind.',
    author: ' Bernard M. Baruch',
    color: 'red'
  }, {
    quote: 'You\'ve gotta dance like there\'s nobody watching,Love like you\'ll never be hurt,Sing like there\'s nobody listening,And live like it\'s heaven on earth.”',
    author: 'William W. Purkey',
    color: 'red'
  }, {
    quote: 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams',
    author: 'Dr. Seuss',
    color: 'red'
  }, {
    quote: 'A room without books is like a body without a soul.',
    author: 'Marcus Tullius Cicero',
    color: 'red'
  }, {
    quote: 'So many books, so little time',
    author: ' Frank Zappa',
    color: 'red'
  }, {
    quote: 'You only live once, but if you do it right, once is enough',
    author: 'Mae West',
    color: 'red'
  }, {
    quote: 'Be the change that you wish to see in the world',
    author: 'Mahatama Gandhi',
    color: 'red'
  }, {
    quote: 'In three words I can sum up everything I\'ve learned about life: it goes on',
    author: 'Robert Frost',
    color: 'red'
  }, {
    quote: 'Friendship ... is born at the moment when one man says to another "What! You too? I thought that no one but myself . . .',
    author: 'C.S. Lewis, The Four Loves',
    color: 'red'
  }, {
    quote: '“Don’t walk in front of me… I may not follow , Don\’t walk behind me… I may not lead , Walk beside me… just be my friend',
    author: 'Albert Camus',
    color: 'red'
  }, {
    quote: 'If you want to know what a man\'s like, take a good look at how he treats his inferiors, not his equals',
    author: 'J.K. Rowling, Harry Potter and the Goblet of Fire',
    color: 'red'
  }, {
    quote: 'No one can make you feel inferior without your consent',
    author: 'Eleanor Roosevelt, This is My Story',
    color: 'red'
  }, {
    quote: 'If you tell the truth, you don\'t have to remember anything',
    author: 'Mark Twain',
    color: 'red'
  }, {
    quote: 'A friend is someone who knows all about you and still loves you',
    author: 'Elbert Hubbard',
    color: 'red'
  }, {
    quote: 'Always forgive your enemies; nothing annoys them so much',
    author: 'Oscar Wilde',
    color: 'red'
  }, {
    quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever',
    author: 'Mahatama Gandhi',
    color: 'red'
  }];

}]);