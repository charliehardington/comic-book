core.directive('navbarAddon', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/navbar/navbar.addons/navbar.addons.template.html',
    scope:{
        test: "&",
        onhammer: "&",
        takepicture: "&",
        openphotolibrary: "&",
        applyfilter: "=",
        addons: "=",
        sticker: "=", 
        bubble: "=", 
        border: "=",
        filter: "=",
        url: "="
    },
    link: function (scope, element, attrs) {

        //Adds proper functions to addons:
        for (var i = 0; i < scope.addons.length; i++) {
            
            scope.addons[i].addonFunction = function(){

                if(this.type === "sticker"){
                    console.log('this source', this.source)
                    scope.sticker(this.source)
                }
                if(this.type === "bubble"){
                    scope.bubble(this.source)
                }
                if(this.type === "border"){
                    scope.border(this.source)
                }
            }

            // console.log(scope.addons[i])
        }

        var isAddon = true;
        //Functions from Camera Controller
        scope.changeNav = function(addon){
            console.log('addon', addon)
            scope.addonType = addon;
            //Changes addonType to the current addon Tab
            if (addon === 'filter') {
                var isAddon = false;
                setFilterThumbnails();
            }
            else isAddon = true;
        };

        var setFilterThumbnails = function(){
        var filtersarr = ['grey', 'poster', 'brown', 'black'];
        filtersarr.forEach(function(filter){
            var canvas = document.getElementById(filter);
            var context = canvas.getContext('2d');
            var thumbnail = new Image();
            thumbnail.src = scope.url;
            thumbnail.crossOrigin = '';
            thumbnail.onload = function(){
                context.drawImage(thumbnail, 0, 0, thumbnail.width, thumbnail.height, 0, 0, canvas.width, canvas.height)
                scope.applyfilter(filter,filter);
            }
        })
    }


        //This Sets Width of Directive Buttons
        scope.myWidth = function(){
            newWidth = Math.floor((100/scope.activeButtons.length))
            return newWidth.toString() + '%'
        }

        scope.setButtons = function(buttonType){
            // var divElem = document.getElementsByClassName("button buttonsToGrab")
            if (buttonType === 'addonStates') {
                scope.activeButtons = scope.addonStates;
            }
            if (buttonType === 'pictureFunctions') {                
                scope.activeButtons = scope.pictureFunctions;
            }
        };


        //Take Picture Directive
        scope.pictureFunctions = [
        {
            state: "CAMERA",
            function: function(){
                scope.takepicture()
                scope.setButtons('addonStates')
            }
        },
        {
            state: "LIBRARY",
            function: function() {
                scope.openphotolibrary()
                scope.setButtons('addonStates')
            }
        },
        {
            state: "CHANGE",
            function: function() {
                scope.setButtons('addonStates')
            }
        }
        // {
        //     state: 'TEST',
        //     function: function(){
        //         setButtons('addonStates')
        //     }
        // }
        ]

        //Addons Directive
        scope.addonStates = [
        {
            state: '<---',
            function: function(){
                scope.setButtons('pictureFunctions')
            }
        },
        {
            state: 'filter',
            function: function(){
                scope.changeNav('filter')
            }
        }, 
        {
            state: 'border',
            function: function(){
                scope.changeNav('border')
            }
        },
        {
            state: 'bubble',
            function: function(){
                scope.changeNav('bubble')
            }
        },
        {
            state: 'sticker',
            function: function(){
                console.log('in here')
                scope.changeNav('sticker')
            }
        }
        ]

        //Starting Set of Buttons and Filters
        scope.addonType = 'filter';
        window.onload = scope.setButtons('pictureFunctions');

        // scope.activeButtons = scope.addonStates;

    }
  };
})



