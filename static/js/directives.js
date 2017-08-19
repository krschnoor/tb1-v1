angular.module('TrialBalance').directive('focus', function() {
    return {
      restrict: 'A',
      link: function($scope,elem,attrs) {
      
        elem.bind('keydown', function(e) {
          var code = e.keyCode || e.which;
          if (code === 13) {
            e.preventDefault();
            elem.parent("td").next().find("input").focus(); 
          }
        });
      }
    }
  });
  
  
  
  
  angular.module('TrialBalance').directive('nextrow', function () {
      return {
          restrict: 'A',
          link: function ($scope, selem, attrs) {
              selem.bind('keydown', function (e) {
                  var code = e.keyCode || e.which;
                  if (code === 13) {
                      e.preventDefault();
                      var pageElems = angular.element(document).find('input,select')
                      elem = $scope.clickedElement
                      focusNext = false,
                       len = pageElems.length; 
                          
                      for (var i = 0; i < len; i++) { 
                          
                          if (focusNext) {
                              
                                  pageElems[i].focus()
                                  break;
                              
                          } else if (pageElems[i].id == elem) {
                              focusNext = true;
                          }  
                      } 
                  } 
              });
          }
      }
  })
  
  