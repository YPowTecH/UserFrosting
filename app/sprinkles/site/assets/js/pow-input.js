$(document).ready(function() {
  var thisBox;
  var bans = [0,0,0,0];
  var picks = [0,0,0,0,0,0,0,0,0,0];

  //if the player select is clicked
  //  we dont want to open the champion select modal
  var clickOnName = false;
  $('.form-group').on('click', function() {
    clickOnName = true;
  });

  $('.draftBox').on('click', function() {
    thisBox = $(this);

    if (!clickOnName) {
      $('#myModal').modal('show');
    }
    clickOnName = false;
  });

  //---------------------------------------------
  //Select the champion in the modal
  //---------------------------------------------
  $('.selectChampion').on('click', function() {
    //if that champion is already in use
    //  you cant pick it again
    if ($(this).hasClass('used')) {
    }
    else {

      if (thisBox.attr('id').substring(0, 1) == "b") {
        bans[thisBox.attr('id').substring(1, 2)] = parseInt($(this).attr('id'));
      }
      else if (thisBox.attr('id').substring(0, 1) == "p") {
        picks[thisBox.attr('id').substring(1, 2)] = parseInt($(this).attr('id'));
      }

      //if the pick wasnt blank or default before the pick
      //  make avilable the previously selected champion
      if (thisBox.attr('name') != "" && thisBox.attr('name') != "default") {
        $(this).parent('div').find('img[name='+thisBox.attr('name')+']').removeClass('used');
      }

      //if the selected champion isnt being removed
      if ($(this).attr('name') != "default") {
        //make sure it cant be picked 2x
        $(this).addClass('used');
      }

      //close the modal, and update the pick box
      $('#myModal').modal('toggle');
      thisBox.attr('name', $(this).attr('name'));

      if (thisBox.hasClass('homeBanBox') || thisBox.hasClass('awayBanBox')) {
        thisBox.children('img').attr('src', 'http://userfrosting.test/assets-raw/img/paladins/champions/ban/'+$(this).attr('name')+'.png');
      }
      else {
        thisBox.children('img').attr('src', 'http://userfrosting.test/assets-raw/img/paladins/champions/draft/'+$(this).attr('name')+'.png');
      }
    }
  });
  //---------------------------------------------

  //---------------------------------------------
  //Last minute checks before we submit the draft
  //---------------------------------------------
  $('#theForm').submit(function() {
    var found = false;
    
    //find out if there is an empty pick
    for (i = 0; i < picks.length; i++) {
      if (picks[i] == 0) {
        found = true;
        break;
      }
    }

    //if there is an empty pick do not submit the draft
    if (found) {
      $('.errorBox').append('\
        <div class="alert alert-danger alert-dismissible" role="alert">\
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="zmdi zmdi-close"></i></button>\
          <strong><i class="zmdi zmdi-close-circle"></i> Error!</strong> Did not select a champion in the pick phase.\
        </div>\
      ');
      $('html,body').animate({
        scrollTop: $('#theForm').offset().top
      }, 'slow');
      return false;
    }
    else {
      $('#hiddenGameBans').val(JSON.stringify(bans));
      $('#hiddenGamePicks').val(JSON.stringify(picks));

      $("#theForm").ufForm({
        validator: page.validators.create,
        msgTarget: $("#alerts-page")
      }).on("submitSuccess.ufForm", function() {
          // Reload the page on success
          window.location.reload();
      });
      return false;
    }
  });
  //---------------------------------------------
});