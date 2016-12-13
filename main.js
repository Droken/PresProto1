var index=0;

$(function(){
    generatePanels();
    setupPanels();
    $("#main-panel").append("<div class='arrow left'>&lt;</div><div class='arrow right'>&gt;</div>");
    generateSelectorList();
    $("#main-panel .selector-list .selector").on("click",function() // When I click on tab
    {
        var panelToShow=$(this).attr("rel");
        $(".current").removeClass("current");
        $(this).addClass("current");
        togglePanel(panelToShow);
    });

    $(".arrow").on("click",function(){
        if($(this).hasClass("left")) navigatePanel("left");
        if($(this).hasClass("right")) navigatePanel("right");
    });

    $(".panel").each(setLeftRight);

    $("body").on("keydown",function(e) {
      if(e.keyCode == 37) { // left
        navigatePanel("left");
      }
      else if(e.keyCode == 39) { // right
        navigatePanel("right");
      }
    });

});

function navigatePanel(direction)
{
      var panel=$(".active").data(direction)
      togglePanel(panel);
      $(".current").removeClass("current");
      $("[rel="+panel+"]").addClass("current");
}

function togglePanel(panel)
{
    if(!$("#"+panel).hasClass("active"))
        $(".panel.active").slideUp(300, function(){
            $(this).removeClass("active");
            $("#"+panel).slideDown(300, function(){
                $(this).addClass("active");
                if($(this).hasClass("image"))$(".arrow").each(function(){
                    $(this).addClass("active-arrow");
                });
                else {$(".arrow").each(function(){
                    $(this).removeClass("active-arrow");
                });
            }});
        });
}

function setLeftRight() {
    var array=$(".panel");
    var element=array[index];

    var left = $(element).attr("id");
    if(index>0) left=$(array[index-1]).attr("id");

    var right= $(element).attr("id");
    if(index<array.length-1) right=$(array[index+1]).attr("id");

    $(element).data("left",left);
    $(element).data("right",right);

    index++;
}

///
/// Copied from http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
///
function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function generateSelectorList()
{
    var res="";
    var i=1;
    $(".panel").each(function(){
        var opt=(i==1)?" current":"";
        if(i==1&&!$(this).hasClass("active"))$(this).addClass("active");
        res+="<li class='selector"+opt+"' rel='"+$(this).attr("id")+"'><br/>"+romanize(i)+"</li>\n";
        i++;
    });
    $(".selector-list").each(function(){$(this).append(res);});
}

function setupPanels()
{
    var i=1;
    $(".panel").each(function(){
      $(this).attr("id","generated-panel-n-"+(i++));
      $(this).find("div").each(function(){
        $(this).addClass("content");
      })
      $(this).find("img").each(function(){
        $(this).addClass("side");
      })
    });
}

function generatePanels()
{
  $("#main-panel div:not(.not-panel)").each(function(){
    if($(this).parent().attr("id")=="main-panel")$(this).addClass("panel");
  });
}