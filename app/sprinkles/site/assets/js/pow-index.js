var url_string = window.location.href;
var url = new URL(url_string);
var fmt = url.searchParams.get("mt");
var fha = url.searchParams.get("ha");
var fm;
if (url.searchParams.getAll('m[]') != null && url.searchParams.getAll('m[]').length > 0) {
  fm = url.searchParams.getAll('m[]');
}
var fot;
if (url.searchParams.getAll('ot[]') != null && url.searchParams.getAll('ot[]').length > 0) {
  fot = url.searchParams.getAll('ot[]');
}
var fp;
if (url.searchParams.getAll('p[]') != null && url.searchParams.getAll('p[]').length > 0) {
  fp = url.searchParams.getAll('p[]');
}
var fhb;
if (url.searchParams.getAll('hb[]') != null && url.searchParams.getAll('hb[]').length > 0) {
  fhb = url.searchParams.getAll('hb[]');
}
var fhp;
if (url.searchParams.getAll('hp[]') != null && url.searchParams.getAll('hp[]').length > 0) {
  fhp = url.searchParams.getAll('hp[]');
}
var fab;
if (url.searchParams.getAll('ab[]') != null && url.searchParams.getAll('ab[]').length > 0) {
  fab = url.searchParams.getAll('ab[]');
}
var fap;
if (url.searchParams.getAll('ap[]') != null && url.searchParams.getAll('ap[]').length > 0) {
  fap = url.searchParams.getAll('ap[]');
}

$(document).ready(function() {
  $('form').submit(function() {
    $(this).find(":input").filter(function(){ return !this.value; }).attr("disabled", "disabled");
    //$(this).find(":input:hidden").filter(function(){ console.log(this); return !this.value; }).attr("disabled", "disabled");
    return true; // ensure form still submits
    //return false; // ensure form still submits
  });

  //Apply url filters
  //filters();
});

function filters() {
  $('#filterMainTeam').val(fmt);
  $('#filterHomeAway').val(fha);

  $.each(fm, function(i, e) {
    $('#filterMaps option[value="' + e + '"]').prop("selected", true);
  });

  $.each(fot, function(i, e) {
    $('#filterOtherTeams option[value="' + e + '"]').prop("selected", true);
  });

  $.each(fp, function(i, e) {
    $('#filterPatches option[value="' + e + '"]').prop("selected", true);
  });

  $.each(fhb, function(i, e) {
    $('#filterHomeBans option[value="' + e + '"]').prop("selected", true);
  });

  $.each(fhp, function(i, e) {
    $('#filterHomePicks option[value="' + e + '"]').prop("selected", true);
  });

  $.each(fab, function(i, e) {
    $('#filterAwayBans option[value="' + e + '"]').prop("selected", true);
  });
  
  $.each(fap, function(i, e) {
    $('#filterAwayPicks option[value="' + e + '"]').prop("selected", true);
  });
}