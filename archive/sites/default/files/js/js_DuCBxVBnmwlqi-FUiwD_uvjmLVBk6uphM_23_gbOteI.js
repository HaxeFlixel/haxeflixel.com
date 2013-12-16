Drupal.absolute_messages = Drupal.absolute_messages || {};

(function ($) {

  Drupal.absolute_messages.initialize = function(){

    Drupal.absolute_messages.timeouts = new Array();
    if ($("#absolute-messages-messages").length > 0) {
      // Move messages from closure to right after opening of body tag.
      $("body").prepend($("#absolute-messages-messages"));
      
      if (Drupal.absolute_messages.max_lines) {
        Drupal.absolute_messages.checkHeights();
      }
      
      // Bind all required events.
      Drupal.absolute_messages.bindEvents();

      // Show all messages.
      $(".absolute-messages-message").not(".absolute-messages-dismiss-all").slideDown(600);
      Drupal.absolute_messages.checkIcons();
    }

    // Move any additional messages addad by Ajax calls 
    // after the page was generated.
    $(document).ajaxComplete(function(){
      Drupal.absolute_messages.checkNewMessages();
    });

  };

  Drupal.absolute_messages.checkHeights = function(){
    var line_height;
    var current_height;
    // display-none elements do not have height, so we need to display
    // them first  (although hidden) to be able to get their height.
    // Also, force-set height to avoid "jumpy" animation.
    $(".absolute-messages-message").each(function(){
      if ($(this).css("display") == "none") {
        $(this).css({'visibility':'hidden', 'display':'block'})
               .css("height", $(this).height());
        line_height = parseInt($(".absolute-messages-message .content").css("line-height"));
        current_height = $(".content", this).height();
        if (current_height > line_height * Drupal.absolute_messages.max_lines) {
          $(".content", this).css("max-height", line_height * Drupal.absolute_messages.max_lines)
                             .addClass("collapsed")
                             .parents(".absolute-messages-message")
                             .addClass("collapsible")
                             .attr("title", "Click to see the whole message");
        }
        // And hide them again so we still can manage them using jQuery sliding.
        $(this).removeAttr('style');
      }
    });
  };
  
  Drupal.absolute_messages.checkIcons = function(){
    var visible_messages = $(".absolute-messages-message:visible").not(".absolute-messages-dismiss-all").size();
    // If no messages are displayed, remove "Dismiss all" icon
    // and show "Show dismissed messages" icon.
    if (visible_messages == 0) {
      $("div.absolute-messages-dismiss-all").hide();
      $("#absolute-messages-show").show();
    };
    // Show "Dismiss all messages" icon if number of visible
    // messages is higher that configured in module settings.
    if (Drupal.absolute_messages.dismiss_all_count && visible_messages > Drupal.absolute_messages.dismiss_all_count) {
      $("div.absolute-messages-dismiss-all").show();
    }
  };

  Drupal.absolute_messages.checkTopOffset = function(){
    // Let's wait for fully generated #admin-menu if it's not ready yet.
    if ($("#admin-menu").height() == null) {
      setTimeout("Drupal.absolute_messages.checkTopOffset()", 100);
    }
    var top_offset = 0;
    if ($(window).scrollTop() < $("#admin-menu").height()) {
      top_offset = $("#admin-menu").height() - $(window).scrollTop();
    }
    $("#absolute-messages-messages").css("top", top_offset + "px");
  };
  
  Drupal.absolute_messages.bindEvents = function(){
    // First try to unbind all previously bound events, to avoid multiple calls
    // after bindings are refreshed when adding new messages on ajaxComplete.
    
    // Fix message bar to the top of browser's viewport.
    if ($("#absolute-messages-messages").css("position") == "fixed") {
      // #toolbar div has fixed position too, no need then to check it when scrolling.
      if ($("#toolbar").length > 0) {
        $("#absolute-messages-messages").css("top", $("#toolbar").height() + "px");
      }
      // #admin-menu could be not ready at page load yet, so "length" property
      // will not work as expected. Therefore let's check body class instead.
      else if ($("body").hasClass("admin-menu")) {
        Drupal.absolute_messages.checkTopOffset();
        $(window).scroll(function(){
          Drupal.absolute_messages.checkTopOffset();
        });
      }
    }
    
    // Dismiss single message.
    $("a.absolute-messages-dismiss").unbind("click").bind("click", function(){
      // Unbind "click" event first to avoid accidental collapsing/expanding.
      $(this).parents(".absolute-messages-message").unbind("click").slideUp(300, function(){
        Drupal.absolute_messages.checkIcons();
      });
    });

    // Dismiss all messages.
    $("a.absolute-messages-dismiss-all").unbind("click").bind("click", function(){
      $(".absolute-messages-message").slideUp(300, function(){
        Drupal.absolute_messages.checkIcons();
      });
    });

    // Show cursor as pointer when hovering over 'show dismissed messages' icon.
    // This is mainly for IE, as it does not want to change the cursor through CSS
    // over the whole element when containing element has width and height of 0px.
    $("#absolute-messages-show").unbind("mouseenter").bind("mouseenter", function(){
      $(this).css("cursor", "pointer");
    }).unbind("mouseleave").bind("mouseleave", function(){
      $(this).css("cursor", "auto");
    });

    // Show all previously dismissed messages after clicking on 'show dismissed' icon.
    $("#absolute-messages-show").unbind("click").bind("click", function(){
      $(this).hide();
      $(".absolute-messages-message").not(".absolute-messages-dismiss-all").slideDown(300, function(){
        Drupal.absolute_messages.checkIcons();
      });
    });

    // Automatic dismiss messages after specified time.
    $.each(Drupal.absolute_messages.dismiss, function(index, value){
      if (value == 1) {
        Drupal.absolute_messages.timeouts[index] = setTimeout(function(){
          $(".absolute-messages-"+index).slideUp(600, function(){
            Drupal.absolute_messages.checkIcons();
          });
        }, Drupal.absolute_messages.dismiss_time[index] * 1000);
      }
    });

    // Clear all timeouts on mouseover and set them again on mouseout.
    $("#absolute-messages-messages").unbind("mouseenter").bind("mouseenter", function(){
      Drupal.absolute_messages.clearTimeouts();
    }).unbind("mouseleave").bind("mouseleave", function(){
      Drupal.absolute_messages.setTimeouts();
    });

    // Expand/collapse long messages.
    $(".absolute-messages-message.collapsible").unbind("click").bind("click", function(){
      if ($(".content", this).hasClass("collapsed")) {
        Drupal.absolute_messages.messageExpand($(".content", this));
      } else {
        Drupal.absolute_messages.messageCollapse($(".content", this));
      }
    });

  };
  
  Drupal.absolute_messages.setTimeouts = function(){
    $.each(Drupal.absolute_messages.dismiss, function(index, value){
      if (value == 1) {
        Drupal.absolute_messages.timeouts[index] = setTimeout(function(){
          $(".absolute-messages-"+index).slideUp(600, function(){
            Drupal.absolute_messages.checkIcons();
          });
        }, Drupal.absolute_messages.dismiss_time[index] * 1000);
      }
    });
  };

  Drupal.absolute_messages.clearTimeouts = function(){
    $.each(Drupal.absolute_messages.dismiss, function(index, value){
      clearTimeout(Drupal.absolute_messages.timeouts[index]);
    });
  };
  
  Drupal.absolute_messages.messageCollapse = function(element){
    $(element).css("max-height", parseInt($(element).css("line-height")) * Drupal.absolute_messages.max_lines)
              .removeClass("expanded")
              .addClass("collapsed");
  };

  Drupal.absolute_messages.messageExpand = function(element){
    $(element).css("max-height", "")
              .removeClass("collapsed")
              .addClass("expanded");
  };

  Drupal.absolute_messages.checkNewMessages = function(){
    Drupal.absolute_messages.clearTimeouts();
    // Search for any #absolute-messages-messages divs
    // which are not direct children of <body> tag.
    $("body").children().find("#absolute-messages-messages").each(function(index){
      if (Drupal.absolute_messages.max_lines) {
        Drupal.absolute_messages.checkHeights();
      }
      // If #absolute-messages-messages dix does not exist yet right after
      // the body tag, let's just move the freshly created one there.
      if ($("body > #absolute-messages-messages").length == 0) {
        $("body").prepend($(this));
        $(".absolute-messages-message").not(".absolute-messages-dismiss-all").slideDown(600);
      }
      // On the other hand, if it already exists there, let's move all
      // new messages only and add them right before "Dismiss all messages"
      // icon, then remove the new #absolute-messages-messages div completely.
      else {
        $("#absolute-messages-show").hide();
        $("div.absolute-messages-dismiss-all", "body > #absolute-messages-messages").before($(".absolute-messages-message", this)
                                                                                    .not(".absolute-messages-dismiss-all", this)
                                                                                    .slideDown(600));
        $(this).remove();
      }
      Drupal.absolute_messages.bindEvents();
      Drupal.absolute_messages.checkIcons();
    });
  };
  
  $(document).ready(function(){
    Drupal.absolute_messages.initialize();
  });

})(jQuery);
;
