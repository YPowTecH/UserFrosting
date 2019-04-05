$(document).ready(function() {
  $( '.draggable3' ).draggable({
    appendTo: '.draftRow',
    /*snap: '.draft',
    snapMode: 'inner',*/
    helper: 'clone',
    zIndex: 2000,
    cursor: 'move',
    revert: true,
    revertDuration: 200,
    disabled: false,
    scroll: false,
    drag: champDragged,
  });
});

function champDragged (event, ui) {
  //$(ui.helper).width('80');
  //$(ui.helper).height('80');
}

//<div style="background: url(/splyceV2/assets/img/champs/Ash.png); background-size: 100%" class="draggable draggable3 ui-widget-content champ" id="Ash"></div>

//Stop flipping my dropdowns
// for some reason if this is turned on it breaks all dropdowns... so dont...
/*
$('.selectpicker').selectpicker({
    dropupAuto: false
});*/

$( function() {
  var bans = [];
  var picks = [];
  
  /*
  $( '.draggable3' ).draggable({
    appendTo: '.draftRow',
    snap: '.draft',
    snapMode: 'inner',
    helper: 'clone',
    cursor: 'move',
    revert: true,
    revertDuration: 200,
    disabled: false,
    scroll: false,
  });*/
  
  $(".snaptarget").droppable({
    accept: '.champ, .draft',
    hoverClass: 'hovered',
    drop: champDropped
  });
  
  var stopIt = 0;
  
  function champDropped (event, ui) {
    var banNumber = $(this).data( 'b' );
    var pickNumber = $(this).data( 'p' );
    var fromBanNumber = ui.draggable.data( 'b' );
    var fromPickNumber = ui.draggable.data( 'p' );
    
    //console.log(banNumber + " " + pickNumber + " | " + fromBanNumber + " " + fromPickNumber);
    
    //setup or activate draggable
		draggableSetup(this);
    
    var pickOrBan = "";
    var fromPickOrBan = "";
    
    if (pickNumber === undefined) {
      pickOrBan = "b";
    }
    else {
      pickOrBan = "p";
    }
    
    if (fromPickNumber === undefined) {
      fromPickOrBan = "b";
    }
    else {
      fromPickOrBan = "p";
    }
    
    //champ from list placed over champ on draft
    if($(ui.draggable).attr('id') !== undefined && $(this).css("background-image") !== "none") {
      //Remove all the old slots html and disable dragging
			$(ui.draggable).draggable('disable');
      $(ui.draggable).addClass('used');
      
      //Make avilable the champ that was there first
        //Get the id of the image
			temp = $(this).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
			$('#'+temp).draggable('enable').removeClass('used');
      
			//Replace the old with the new
			//$(this).html('');//remove the x input
      $(this).css({'background-size':'100%', 'background-image':ui.draggable.css("background-image")});
      
      //append an x button to this div
			//when clicked it will clear out the slot 
			$('<input type="button" class="xTile" value="X">').css({'visibility':'hidden','position':'absolute','z-index':'100'}).click(function(){
        //Make avilable the champ that was there first
        //Get the id of the image
        temp = $(this).parent().css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
        $('#'+temp).draggable('enable').removeClass('used');
        //reset the cell
        $(this).parent().css({'background-image':''});
				$(this).parent().draggable('disable');
				$(this).parent().html('');
				$(this).remove();
        
        if (pickOrBan == "b") {
          bans[banNumber] = "";
        }
        else {
          picks[pickNumber] = "";
        }
        
        //console.log(bans);
        //console.log(picks);
			}).appendTo(this);
      
      //show x button when hovering
			$(this).mouseenter(function(){
				$(this).find(".xTile").css('visibility','visible');
			}).mouseleave(function(){//remove x button when not hovering
				$(this).find(".xTile").css('visibility','hidden');
			});
      //show x button when hovering even over white box/name selector
			$(".nameSelectBox").mouseenter(function(){
				$(this).siblings('.snaptarget').find(".xTile").css('visibility','visible');
			}).mouseleave(function(){//remove x button when not hovering
				$(this).siblings('.snaptarget').find(".xTile").css('visibility','hidden');
			});
      
      //Get the id of the image
			temp = $(ui.draggable).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
      
      if (pickOrBan == "b") {
        bans[banNumber] = temp;
      }
      else {
        picks[pickNumber] = temp;
      }
      
      //console.log(bans);
      //console.log(picks);
    }
    //champ from list placed on draft
    else if($(ui.draggable).attr('id') !== undefined){
      //Remove all the old slots html and disable dragging
			$(ui.draggable).draggable('disable');
      $(ui.draggable).addClass('used');
      
			//Replace the old with the new
			//$(this).html('');//remove the x input
      $(this).css({'background-size':'100%','background-image':ui.draggable.css("background-image")});
      
      //append an x button to this div
			//when clicked it will clear out the slot 
			$('<input type="button" class="xTile" value="X">').css({'visibility':'hidden','position':'absolute','z-index':'100'}).click(function(){
        //Make avilable the champ that was there first
        //Get the id of the image
        temp = $(this).parent().css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
        $('#'+temp).draggable('enable').removeClass('used');
        //reset the cell
        $(this).parent().css({'background-image':''});
				$(this).parent().draggable('disable');
				$(this).parent().html('');
				$(this).remove();
        
        if (pickOrBan == "b") {
          bans[banNumber] = "";
        }
        else {
          picks[pickNumber] = "";
        }
        
        //console.log(bans);
        //console.log(picks);
			}).prependTo(this);
      
      //show x button when hovering
			$(this).mouseenter(function(){
				$(this).find(".xTile").css('visibility','visible');
			}).mouseleave(function(){//remove x button when not hovering
				$(this).find(".xTile").css('visibility','hidden');
			});
      //show x button when hovering even over white box/name selector
			$(".nameSelectBox").mouseenter(function(){
				$(this).siblings('.snaptarget').find(".xTile").css('visibility','visible');
			}).mouseleave(function(){//remove x button when not hovering
				$(this).siblings('.snaptarget').find(".xTile").css('visibility','hidden');
			});
      
      //Get the id of the image
			temp = $(ui.draggable).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
      
      if (pickOrBan == "b") {
        bans[banNumber] = temp;
      }
      else {
        picks[pickNumber] = temp;
      }
      
      //console.log(bans);
      //console.log(picks);
    }
    //Tile in preview is moved to empty slot
		else if($(this).css("background-image") === "none"){
      //Remove all the old slots html and disable dragging
			$(ui.draggable).html('');
			$(ui.draggable).draggable('disable');
      
      //Update the new slot with the old slots image
			$(this).css("background-size", "100%");
			$(this).css("background-image",ui.draggable.css("background-image"));
      
      //Remove the image from the old slot
			$(ui.draggable).css({'background-image':''});
      
      //append an x button to this div
			//when clicked it will clear out the slot 
			$('<input type="button" class="xTile" value="X">').css({'visibility':'hidden','position':'absolute','z-index':'100'}).click(function(){
        //Make avilable the champ that was there first
        //Get the id of the image
        temp = $(this).parent().css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
        $('#'+temp).draggable('enable').removeClass('used');
        //reset the cell
        $(this).parent().css({'background-image':''});
				$(this).parent().draggable('disable');
				$(this).parent().html('');
				$(this).remove();
        
        if (pickOrBan == "b") {
          bans[banNumber] = "";
        }
        else {
          picks[pickNumber] = "";
        }
        
        //console.log(bans);
        //console.log(picks);
			}).appendTo(this);
      
      //show x button when hovering
			$(this).mouseenter(function(){
				$(this).find(".xTile").css('visibility','visible');
			}).mouseleave(function(){//remove x button when not hovering
				$(this).find(".xTile").css('visibility','hidden');
			});
      //show x button when hovering even over white box/name selector
			$(".nameSelectBox").mouseenter(function(){
				$(this).siblings('.snaptarget').find(".xTile").css('visibility','visible');
			}).mouseleave(function(){//remove x button when not hovering
				$(this).siblings('.snaptarget').find(".xTile").css('visibility','hidden');
			});
      
			//Get the id of the image
			temp = $(this).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
      
      //Relocate the champ in the draft
      if (pickOrBan == "b") {
        bans[banNumber] = temp;
      }
      else {
        picks[pickNumber] = temp;
      }
      
      //Clear the stop the champ use to be
      if (fromPickOrBan == "b") {
        bans[fromBanNumber] = "";
      }
      else {
        picks[fromPickNumber] = "";
      }
    
      //console.log(bans);
      //console.log(picks);
    }
    //Tile in preview is moved to another tiles location so swap the two
		else if($(this).css("background-image") !== "none" && ui.draggable.css("background-image") !== "none"){
      stopIt = 1;
      //swap the two images
			temp = $(this).css("background-image");
			$(this).css({'background-image':ui.draggable.css("background-image")});
			$(ui.draggable).css({'background-image':temp});
      
      //Get the id of the image
			temp = $(this).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
			
      //Swap the champs in the draft
      if (pickOrBan == "b") {
        bans[banNumber] = temp;
      }
      else {
        picks[pickNumber] = temp;
      }
			
			//Get the id of the image
			temp = $(ui.draggable).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
			
      //Swap the champs in the draft
      if (fromPickOrBan == "b") {
        bans[fromBanNumber] = temp;
      }
      else {
        picks[fromPickNumber] = temp;
      }
    }
    
    //this makes it do that instantly
		ui.draggable.draggable( 'option', 'revertDuration', -1 );
		//wait 1ms and then change the revertduration back to its default value of 200
		setTimeout(function(){ ui.draggable.draggable( 'option', 'revertDuration', 200 ); }, 1);
  }
  
  //--------------------------------------
  //Function to deal with setting up 
  //draggable properties or activating them
  //--------------------------------------
  function draggableSetup(it) {
    //If a tile has been here before enable it again
    //now that there is another tile on that spot
    if($(it).is('.ui-draggable')){
      $(it).draggable('enable');
    }//If no tile has ever been here before setup that spot to be dragged
    else if(!$(it).is('.ui-draggable')){
      $(it).draggable({
        containment: '.draftRow',
        stack: '.draft',
        cursor: 'move',
        helper: 'clone',
        zIndex: 2000,
        start: function(event, ui){
          $(it).css({'background-size':'0%','z-index':'2000'});
        },
        //--------------------------------------
        //**************************************
        //When it reverts it makes the 
        //background-size 100% but before the 
        //image gets back to the square so looks
        //super bad
        //--------------------------------------
        revert: function(droppableObj){
          if(droppableObj === false){
            //setTimeout(function(){
            $(it).css({'background-size':'100%'});
            //}, 200);
            return true;
          }
          else{
            $(it).css({'background-size':'100%'});
            return false;
            /*if(stopIt == 0){
              $(it).css({'border':'2px solid green',''background-size':'100%'});
              return false;
            }
            else{
              stopIt = 0;
              $(it).css({'background-size':'100%'});
              return false;
            }*/
          }
        },
        revertDuration: 200
      });
    }
  }
  
  //--------------------------------------
	//When a champ is clicked it will find the
	//  the first open space in the draft
  //  to be placed
	//If there is no space it will do nothing
	//--------------------------------------
	//$('.champ').click(function(){
	$('.draftRow').on('click', '.champ', function(){
    if ($(this).hasClass('used')) {
      return false;
    }
		//Get the image and path
		temp = $(this).css("background-image");
    tempSmall = $(this).css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
    
    var da = $('.draft');
    var draftArray = [da[0],da[1],da[7],da[8],da[2],da[9],da[10],da[3],da[4],da[11],da[12],da[5],da[6],da[13]];
    
    var place = 0;
    var placed = 0;
    for (var i = 0; i < draftArray.length; i++) {
      var thisIs = $(draftArray[i]);
      var banNumber = thisIs.data( 'b' );
      var pickNumber = thisIs.data( 'p' );
      var pickOrBan = "";
      
      if (pickNumber === undefined) {
        pickOrBan = "b";
      }
      else {
        pickOrBan = "p";
      }
      
      //console.log(bans);
      //console.log(picks);
      //console.log(banNumber + " " + pickNumber + " " + pickOrBan);
      
      if (place != 1 && place != 2) {
        if (thisIs.css('background-image') === "none"){
          //setup or activate draggable
          draggableSetup(thisIs);
          
          thisIs.css({'background-size':'100%','background-image':temp});
          
          //append an x button to this div
					//when clicked it will clear out the slot 
					$('<input type="button" class="xTile" value="X">').css({'visibility':'hidden','position':'absolute','z-index':'100'}).click(function(){
            //Make avilable the champ that was there first
            tempSmall = thisIs.css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
            $('#'+tempSmall).draggable('enable').removeClass('used');
            //reset the cell
						$(this).parent().css({'background-image':''});
						$(this).parent().draggable('disable');
						$(this).parent().html('');
						$(this).remove();
            
            if (pickOrBan == "b") {
              bans[banNumber] = "";
            }
            else {
              picks[pickNumber] = "";
            }
            
            //console.log(bans);
            //console.log(picks);
					}).appendTo(thisIs);
					
          //show x button when hovering
          thisIs.mouseenter(function(){
            thisIs.find(".xTile").css('visibility','visible');
          }).mouseleave(function(){//remove x button when not hovering
            thisIs.find(".xTile").css('visibility','hidden');
          });
          //show x button when hovering even over white box/name selector
          $(".nameSelectBox").mouseenter(function(){
            thisIs.siblings('.snaptarget').find(".xTile").css('visibility','visible');
          }).mouseleave(function(){//remove x button when not hovering
            thisIs.siblings('.snaptarget').find(".xTile").css('visibility','hidden');
          });
          
          if (pickOrBan == "b") {
            bans[banNumber] = tempSmall;
          }
          else {
            picks[pickNumber] = tempSmall;
          }
            
          //console.log(bans);
          //console.log(picks);
          
          placed = 1;
          break;
        }
      }
      else {
        if (place == 1) {
          thisIs = $(draftArray[i+1]);
          if (thisIs.css('background-image') === "none"){
            //setup or activate draggable
            draggableSetup(thisIs);
            
            thisIs.css({'background-size':'100%','background-image':temp});
            
            //append an x button to this div
            //when clicked it will clear out the slot 
            $('<input type="button" class="xTile" value="X">').css({'visibility':'hidden','position':'absolute','z-index':'100'}).click(function(){
              //Make avilable the champ that was there first
              tempSmall = thisIs.css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
              $('#'+tempSmall).draggable('enable').removeClass('used');
              //reset the cell
              $(this).parent().css({'background-image':''});
              $(this).parent().draggable('disable');
              $(this).parent().html('');
              $(this).remove();
        
              if (pickOrBan == "b") {
                bans[banNumber-1] = "";
              }
              else {
                picks[pickNumber-1] = "";
              }
              
              //console.log(bans);
              //console.log(picks);
            }).appendTo(thisIs);
            
            
            //show x button when hovering
            $(thisIs).mouseenter(function(){
              $(thisIs).find(".xTile").css('visibility','visible');
            }).mouseleave(function(){//remove x button when not hovering
              $(thisIs).find(".xTile").css('visibility','hidden');
            });
            //show x button when hovering even over white box/name selector
            $(".nameSelectBox").mouseenter(function(){
              $(thisIs).siblings('.snaptarget').find(".xTile").css('visibility','visible');
            }).mouseleave(function(){//remove x button when not hovering
              $(thisIs).siblings('.snaptarget').find(".xTile").css('visibility','hidden');
            });
            
            if (pickOrBan == "b") {
              bans[banNumber-1] = tempSmall;
            }
            else {
              picks[pickNumber-1] = tempSmall;
            }
            
            //console.log(bans);
            //console.log(picks);
            
            placed = 1;
            break;
          }
        }
        if (place == 2) {
          thisIs = $(draftArray[i-1]);
          if (thisIs.css('background-image') === "none"){
            //setup or activate draggable
            draggableSetup(thisIs);
            
            thisIs.css({'background-size':'100%','background-image':temp});
            
            //append an x button to this div
            //when clicked it will clear out the slot 
            $('<input type="button" class="xTile" value="X">').css({'visibility':'hidden','position':'absolute','z-index':'100'}).click(function(){
              //Make avilable the champ that was there first
              tempSmall = thisIs.css("background-image").match(/[^/]*(?=\.[^.]+($|\?))/)[0];
              $('#'+tempSmall).draggable('enable').removeClass('used');
              //reset the cell
              $(this).parent().css({'background-image':''});
              $(this).parent().draggable('disable');
              $(this).parent().html('');
              $(this).remove();
        
              if (pickOrBan == "b") {
                bans[banNumber+1] = "";
              }
              else {
                picks[pickNumber+1] = "";
              }
              
              //console.log(bans);
              //console.log(picks);
            }).appendTo(thisIs);
            
            //show x button when hovering
            $(thisIs).mouseenter(function(){
              $(thisIs).find(".xTile").css('visibility','visible');
            }).mouseleave(function(){//remove x button when not hovering
              $(thisIs).find(".xTile").css('visibility','hidden');
            });
            //show x button when hovering even over white box/name selector
            $(".nameSelectBox").mouseenter(function(){
              $(thisIs).siblings('.snaptarget').find(".xTile").css('visibility','visible');
            }).mouseleave(function(){//remove x button when not hovering
              $(thisIs).siblings('.snaptarget').find(".xTile").css('visibility','hidden');
            });
            
            if (pickOrBan == "b") {
              bans[banNumber+1] = tempSmall;
            }
            else {
              picks[pickNumber+1] = tempSmall;
            }
            
            //console.log(bans);
            //console.log(picks);
            
            placed = 1;
            break;
          }
        }
      }
      place++;
    }
    if (placed == 1) {
      //Remove all the old slots html and disable dragging
      $(this).draggable('disable');
      $(this).addClass('used');
      return false;
    }
  });
  
  //--------------------------------------
	//x button that goes in the input box
	//to clear and reset the search
	//--------------------------------------
	function tog(v){return v?'addClass':'removeClass';} 
	$(document).on('input', '.clearable', function(){
		$(this)[tog(this.value)]('x');
	}).on('mousemove', '.x', function( e ){
		$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
	}).on('touchstart click', '.onX', function( ev ){
		ev.preventDefault();
		$(this).removeClass('x onX').val('').change();
		$('#championSelectWindow .champ').css('display','block');
	});
	//--------------------------------------
  
  //--------------------------------------
	//
	//--------------------------------------
	$('.champSearch input').keyup(function(){
		temp = $(this).val();
		if(temp == ""){//if the search box is empty
      $('#championSelectWindow .champ').css('display','block');
		}
		else{
			//Hide tiles if temp isnt in the name
			var notAMatch = new RegExp("^((?!"+temp+")[\\s\\S])*$", "i");
			$('#championSelectWindow .champ').filter(function(){
				return notAMatch.test($(this).attr('name'));
			}).css('display','none');
			
			//Put back if temp becomes part of the name again
			var match = new RegExp("^.*"+temp+".*$","i");
			$('#championSelectWindow .champ').filter(function(){
				return match.test($(this).attr('name'));
			}).css('display','block');
		}
	});
	//--------------------------------------
  
  //--------------------------------------
	//Reset all the values and the preview to
	//zero or empty or disable
	//--------------------------------------
	$('.reset').click(function(){
    bans = [];
    picks = [];
    
    $('.champ').each(function(){
      if($(this).hasClass("used"))
        $(this).removeClass("used");
        $(this).draggable('enable');
    });
    
    $('.draft').each(function(){
      if($(this).is('.ui-draggable'))//tileSlots being cleared and disabled if enabled
        $(this).html('').css({'background-image':''}).draggable('disable');
    });
    
    $("#team1").val('');
    $("#team2").val('');
    $("#map").val('');
    $("#pw").val('');
    $("#winner").val('');
    $("#score").val('');
    for (var i = 0; i < 10; i++) {
      $("#player"+i).val('');
      $("#player"+i).selectpicker("refresh");
    }
    
    $("#team1").selectpicker("refresh");
    $("#team2").selectpicker("refresh");
    $("#map").selectpicker("refresh");
    $("#winner").selectpicker("refresh");
  });
  
  // Variable to hold request
  var request;

  $("#theForm").submit(function(event){
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();
    
    // place the bans and picks arrays in their hidden input spots
    $('#hiddenGameBans').val(JSON.stringify(bans));
    $('#hiddenGamePicks').val(JSON.stringify(picks));
    
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);
      
    $.post('inputSubmit.php', serializedData, function(response) {
      // Log the response to the console
      console.log("Response: "+response);
      if (response == "did it") {
        $('.reset').trigger('click');
      }
    })// Callback handler that will be called on success
      /*.done(function (response, textStatus, jqXHR){
          // Log a message to the console
          $('.reset').trigger('click');
          console.log("Hooray, it worked!");
          
      })*/
      // Callback handler that will be called on failure
      .fail(function (jqXHR, textStatus, errorThrown){
          // Log the error to the console
          console.error(
              "The following error occurred: "+
              textStatus, errorThrown
          );
      })// Callback handler that will be called regardless
        // if the request failed or succeeded
      .always(function () {
          // Reenable the inputs
          $inputs.prop("disabled", false);
          $("#team1").selectpicker("refresh");
          $("#team2").selectpicker("refresh");
          $("#map").selectpicker("refresh");
          $("#winner").selectpicker("refresh");
          for (var i = 0; i < 10; i++) {
            $("#player"+i).selectpicker("refresh");
          }
      });
  });
});


