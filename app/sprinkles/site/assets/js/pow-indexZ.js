var url_string = window.location.href;
var url = new URL(url_string);
var fmt = url.searchParams.get("mt");
var fha = url.searchParams.get("ha");
var fm;
if (url.searchParams.get('m') != null && url.searchParams.get('m').length > 0) {
 fm = (url.searchParams.get('m')).split(',');
}
var fot;
if (url.searchParams.get('ot') != null && url.searchParams.get('ot').length > 0) {
 fot = (url.searchParams.get('ot')).split(',');
}
var fp;
if (url.searchParams.get('p') != null && url.searchParams.get('p').length > 0) {
 fp = (url.searchParams.get('p')).split(',');
}
var fhb;
if (url.searchParams.get('hb') != null && url.searchParams.get('hb').length > 0) {
 fhb = (url.searchParams.get('hb')).split(',');
}
var fhp;
if (url.searchParams.get('hp') != null && url.searchParams.get('hp').length > 0) {
 fhp = (url.searchParams.get('hp')).split(',');
}
var fab;
if (url.searchParams.get('ab') != null && url.searchParams.get('ab').length > 0) {
 fab = (url.searchParams.get('ab')).split(',');
}
var fap;
if (url.searchParams.get('ap') != null && url.searchParams.get('ap').length > 0) {
 fap = (url.searchParams.get('ap')).split(',');
}

$.getJSON('index-api.php', {mt: fmt, ha: fha, m: fm, p: fp, hb: fhb, hp: fhp, ab: fab, ap: fap} ,function(data){
  $.getJSON('apiSelection.php', {ins: [0, 1, 2, 4]}, function(select) {
    //have to setup the selection inputs first
    setupSelects(select);
    //then place all the games
    main(data);
    //before we can apply user filters
    filters();
  }).fail(function(jqxhr, textStatus, error) { var err = textStatus + ", " + error; console.log(err);});
}).fail(function(jqxhr, textStatus, error) { var err = textStatus + ", " + error; console.log(err);});

function filters() {
  //----------
  //Remeber filter info
  //----------
  if (fmt == undefined || fmt == '' || fmt == null) {
    $('#filterMainTeam').val(fMainTeam);
  }
  else {
    $('#filterMainTeam').val(fmt);
  }
  
  if (fha == undefined || fha == '' || fha == null) {
    $('#filterHomeAway').val(fHomeAway);
  }
  else {
    $('#filterHomeAway').val(fha);
  }
  
  if (fm == undefined || fm == '' || fm == null || fm.length < 1) {
    $.each(JSON.parse(fMap), function(i, e) {
      $('#filterMaps option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fm, function(i, e) {
      $('#filterMaps option[value="' + e + '"]').prop("selected", true);
    });
  }
  
  if (fot == undefined || fot == '' || fot == null || fot.length < 1) {
    $.each(JSON.parse(fOtherTeam), function(i, e) {
      $('#filterOtherTeams option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fot, function(i, e) {
      $('#filterOtherTeams option[value="' + e + '"]').prop("selected", true);
    });
  }
  
  if (fp == undefined || fp == '' || fp == null || fp.length < 1) {
    $.each(JSON.parse(fPatch), function(i, e) {
      $('#filterPatches option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fp, function(i, e) {
      $('#filterPatches option[value="' + e + '"]').prop("selected", true);
    });
  }
  
  
  //pb
  if (fhb == undefined || fhb == '' || fhb == null || fhb.length < 1) {
    $.each(JSON.parse(fHomeBan), function(i, e) {
      $('#filterHomeBans option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fhb, function(i, e) {
      $('#filterHomeBans option[value="' + e + '"]').prop("selected", true);
    });
  }
  
  if (fhp == undefined || fhp == '' || fhp == null || fhp.length < 1) {
    $.each(JSON.parse(fHomePick), function(i, e) {
      $('#filterHomePicks option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fhp, function(i, e) {
      $('#filterHomePicks option[value="' + e + '"]').prop("selected", true);
    });
  }
  
  if (fab == undefined || fab == '' || fab == null || fab.length < 1) {
    $.each(JSON.parse(fAwayBan), function(i, e) {
      $('#filterAwayBans option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fab, function(i, e) {
      $('#filterAwayBans option[value="' + e + '"]').prop("selected", true);
    });
  }
  
  if (fap == undefined || fap == '' || fap == null || fap.length < 1) {
    $.each(JSON.parse(fAwayPick), function(i, e) {
      $('#filterAwayPicks option[value="' + e + '"]').prop("selected", true);
    });
  }
  else {
    $.each(fap, function(i, e) {
      $('#filterAwayPicks option[value="' + e + '"]').prop("selected", true);
    });
  }
  //----------
}

function setupSelects(select) {
  $.each(select[0], function(i, s) {
    $('#filterMainTeam').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
  });
  $.each(select[0], function(i, s) {
    $('#filterOtherTeams').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
  });
  $.each(select[2], function(i, s) {
    $('#filterMaps').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
  });
  $.each(select[3], function(i, s) {
    $('#filterPatches').append($('<option>', {
      value: s.name,
      text: s.name
    }));
  });
  
  //Champions
  $.each(select[1], function(i, s) {
    $('#filterHomeBans').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
    $('#filterAwayBans').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
    $('#filterHomePicks').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
    $('#filterAwayPicks').append($('<option>', {
      value: s.abr,
      text: s.name
    }));
  });
}

function main(data) {
  $.each(data, function(i, d){
    listGame(d);
  });
}

function listGame(d) {
  var hWin = "";
  var aWin = "";
  var borderWinLoseColor = "";
  
  //winner gets a w tag
  if (d.winner == "h") {
    hWin = " (W)";
  }
  else if (d.winner == "a") {
    aWin = " (W)";
  }
  
  //Is this one of the main teams games
  //  - did they win or loss if it was
  if (fmt != undefined && fmt != '' && fmt != null) {
    if (d.home == fmt && d.winner == "h") {
      borderWinLoseColor = "mt-w";
    }
    else if (d.home == fmt && d.winner == "a") {
      borderWinLoseColor = "mt-l";
    }
    else if (d.away == fmt && d.winner == "a") {
      borderWinLoseColor = "mt-w";
    }
    else if (d.away == fmt && d.winner == "h") {
      borderWinLoseColor = "mt-l";
    }
  }
  else if (fMainTeam != "") {
    if (d.home == fMainTeam && d.winner == "h") {
      borderWinLoseColor = "mt-w";
    }
    else if (d.home == fMainTeam && d.winner == "a") {
      borderWinLoseColor = "mt-l";
    }
    else if (d.away == fMainTeam && d.winner == "a") {
      borderWinLoseColor = "mt-w";
    }
    else if (d.away == fMainTeam && d.winner == "h") {
      borderWinLoseColor = "mt-l";
    }
  }
  
  $('.listGames').append('\
  <div class="col-xl-12 col-lg-12 col-sm-12">\
    <div class="card">\
      <div class="text-center gameBox '+borderWinLoseColor+'">\
        <div class="row gameBoxHeader" style="background-image:url(assets/img/paladins/maps/'+d.map.replace(/\s/g, '')+'.png);background-position:center;">\
          <div class="col-sm-4">\
            <div class="gamePlayDate">'+d.playDate+'</div>\
            <div class="gameTeam">'+d.home+hWin+'</div>\
          </div>\
          <div class="col-sm-4">\
            <div class="">'+d.score+'</div>\
            <div class="">'+d.map+'</div>\
          </div>\
          <div class="col-sm-4">\
            <div class="gameTeam">'+d.away+aWin+'</div>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-sm-6">\
            <table>\
              <tbody>\
                <tr>\
                  <td class="gamePickTag"><div class="">P</div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[0].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[0].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[3].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[3].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[4].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[4].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[7].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[7].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[8].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[8].name+'.png" class="gamePBChamps"></div></td>\
                </tr>\
                <tr>\
                  <td class="gameBanTag"><div class="">B</div></td>\
                  <td><div class="gamePBClasses c-'+d.bans[0].role+'"><img src="assets/img/paladins/champs/80/'+d.bans[0].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.bans[2].role+'"><img src="assets/img/paladins/champs/80/'+d.bans[2].name+'.png" class="gamePBChamps"></div></td>\
                </tr>\
              </tbody>\
            </table>\
          </div>\
          <div class="col-sm-6">\
            <table class="float-right">\
              <tbody>\
                <tr>\
                  <td><div class="gamePBClasses c-'+d.picks[1].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[1].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[2].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[2].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[5].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[5].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[6].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[6].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.picks[9].role+'"><img src="assets/img/paladins/champs/80/'+d.picks[9].name+'.png" class="gamePBChamps"></div></td>\
                  <td class="gamePickTag"><div class="">P</div></td>\
                </tr>\
                <tr>\
                  <td></td>\
                  <td></td>\
                  <td></td>\
                  <td><div class="gamePBClasses c-'+d.bans[1].role+'"><img src="assets/img/paladins/champs/80/'+d.bans[1].name+'.png" class="gamePBChamps"></div></td>\
                  <td><div class="gamePBClasses c-'+d.bans[3].role+'"><img src="assets/img/paladins/champs/80/'+d.bans[3].name+'.png" class="gamePBChamps"></div></td>\
                  <td class="gameBanTag"><div class="">B</div></td>\
                </tr>\
                </tr>\
              </tbody>\
            </table>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>');
}

$(document).ready(function() {
  
  //Show classes instead of champs
  var showClasses = false;
  $('#filterShowClasses').on('click', function() {
    if (!showClasses) {
      $('.gamePBChamps').css('display', 'none');
      showClasses = true;
    }
    else {
      $('.gamePBChamps').css('display', '');
      showClasses = false;
    }
  });
});