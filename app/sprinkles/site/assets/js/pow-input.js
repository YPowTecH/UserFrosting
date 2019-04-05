$(document).ready(function() {
  var thisBox;
  $('.draftBox').on('click', function() {
    thisBox = $(this);
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

      //if the pick wasnt blank or default before the pick
      //  make avilable the previously selected champion
      if (thisBox.attr('name') != "" && thisBox.attr('name') != "default") {
        $(this).parent('div').find('#'+thisBox.attr('name')).removeClass('used');
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
});
